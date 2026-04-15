import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
import { fileURLToPath } from 'url'

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'Mozilla/5.0 (Linux; Android 10)',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  'Mozilla/5.0 (X11; Linux x86_64)',
  'Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X)'
]

function randomUA() {
  return userAgents[Math.floor(Math.random() * userAgents.length)]
}

function unwrapMessage(m) {
  let n = m
  while (
    n?.viewOnceMessage?.message ||
    n?.viewOnceMessageV2?.message ||
    n?.viewOnceMessageV2Extension?.message ||
    n?.ephemeralMessage?.message
  ) {
    n =
      n.viewOnceMessage?.message ||
      n.viewOnceMessageV2?.message ||
      n.viewOnceMessageV2Extension?.message ||
      n.ephemeralMessage?.message
  }
  return n
}

function ensureWA(wa, conn) {
  if (wa?.downloadContentFromMessage) return wa
  if (conn?.wa?.downloadContentFromMessage) return conn.wa
  if (global.wa?.downloadContentFromMessage) return global.wa
  return null
}

function extFromMime(mime, fallback = 'bin') {
  if (!mime) return fallback
  const m = mime.toLowerCase()
  if (m.includes('image/')) return 'jpg'
  if (m.includes('video/')) return 'mp4'
  if (m.includes('audio/')) return 'mp3'
  if (m.includes('pdf')) return 'pdf'
  return fallback
}

async function uploadToCatbox(filePath, reply) {
  const buffer = await fs.promises.readFile(filePath)
  const detected = await fileTypeFromBuffer(buffer)
  const ext = detected?.ext || 'bin'
  const mime = detected?.mime || 'application/octet-stream'
  const filename = `${Date.now()}_${crypto.randomBytes(3).toString('hex')}.${ext}`

  await reply(`📦 Preparando upload\nExt: ${ext}\nMime: ${mime}\nSize: ${buffer.length}`)

  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, {
    filename,
    contentType: mime
  })

  let lastError = null

  for (let i = 0; i < 3; i++) {
    try {
      const ua = randomUA()

      await reply(`🌐 Intento ${i + 1}\nUA: ${ua}`)

      const res = await axios({
        method: 'POST',
        url: 'https://catbox.moe/user/api.php',
        data: form,
        headers: {
          ...form.getHeaders(),
          'User-Agent': ua,
          'Accept': '*/*',
          'Connection': 'keep-alive'
        },
        timeout: 60000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: () => true
      })

      await reply(`📡 STATUS: ${res.status}`)

      if (res.status === 200 && typeof res.data === 'string') {
        return res.data.trim()
      }

      lastError = `Status: ${res.status}\n${JSON.stringify(res.data)}`
      await reply(`⚠️ Error intento ${i + 1}\n${lastError}`)

    } catch (e) {
      lastError = e.message
      await reply(`❌ Axios fallo\n${e.message}`)
    }
  }

  throw new Error(`Catbox fallo\n${lastError}`)
}

let handler = async (msg, { conn, command, wa }) => {
  const chatId = msg.key.remoteJid
  const pref = global.prefixes?.[0] || '.'

  const debug = async (txt) => {
    try {
      await conn.sendMessage(chatId, { text: txt }, { quoted: msg })
    } catch {}
  }

  const ctx = msg.message?.extendedTextMessage?.contextInfo
  const rawQuoted = ctx?.quotedMessage
  const quoted = rawQuoted ? unwrapMessage(rawQuoted) : null

  if (!quoted) {
    return conn.sendMessage(
      chatId,
      { text: `✳️ Usa:\n${pref}${command}\nResponde a media` },
      { quoted: msg }
    )
  }

  await conn.sendMessage(chatId, { react: { text: '☁️', key: msg.key } })

  let rawPath
  let finalPath

  try {
    let type
    let media

    if (quoted.imageMessage) {
      type = 'image'
      media = quoted.imageMessage
    } else if (quoted.videoMessage) {
      type = 'video'
      media = quoted.videoMessage
    } else if (quoted.stickerMessage) {
      type = 'sticker'
      media = quoted.stickerMessage
    } else if (quoted.audioMessage) {
      type = 'audio'
      media = quoted.audioMessage
    } else {
      throw new Error('Tipo no permitido')
    }

    await debug(`📂 Tipo detectado: ${type}`)

    const WA = ensureWA(wa, conn)
    if (!WA) throw new Error('WA no disponible')

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const tmpDir = path.join(__dirname, 'tmp')

    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

    const ext = type === 'sticker' ? 'webp' : extFromMime(media.mimetype)
    rawPath = path.join(tmpDir, `${Date.now()}.${ext}`)

    const stream = await WA.downloadContentFromMessage(
      media,
      type === 'sticker' ? 'sticker' : type
    )

    const ws = fs.createWriteStream(rawPath)

    for await (const chunk of stream) {
      ws.write(chunk)
    }

    ws.end()
    await new Promise(r => ws.on('finish', r))

    const size = fs.statSync(rawPath).size

    await debug(`📥 Descargado\nPath: ${rawPath}\nSize: ${size}`)

    if (size > 200 * 1024 * 1024) throw new Error('Archivo muy grande')

    finalPath = rawPath

    if (type === 'audio' && ext !== 'mp3') {
      finalPath = path.join(tmpDir, `${Date.now()}_audio.mp3`)

      await debug('🎧 Convirtiendo a mp3')

      await new Promise((res, rej) => {
        ffmpeg(rawPath)
          .audioCodec('libmp3lame')
          .toFormat('mp3')
          .on('end', res)
          .on('error', rej)
          .save(finalPath)
      })

      fs.unlinkSync(rawPath)

      await debug(`✅ Convertido: ${finalPath}`)
    }

    const url = await uploadToCatbox(finalPath, debug)

    await conn.sendMessage(
      chatId,
      { text: `✅ Subido\n${url}` },
      { quoted: msg }
    )

    await conn.sendMessage(chatId, { react: { text: '✅', key: msg.key } })

  } catch (e) {
    await debug(`❌ ERROR GLOBAL\n${e.stack || e.message}`)
    await conn.sendMessage(
      chatId,
      { text: `❌ Error\n${e.message}` },
      { quoted: msg }
    )
    await conn.sendMessage(chatId, { react: { text: '❌', key: msg.key } })
  } finally {
    try { if (rawPath) fs.unlinkSync(rawPath) } catch {}
    try { if (finalPath && finalPath !== rawPath) fs.unlinkSync(finalPath) } catch {}
  }
}

handler.command = ['tourl']
handler.help = ['tourl']
handler.tags = ['herramientas']

export default handler