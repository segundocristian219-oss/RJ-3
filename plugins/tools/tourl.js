import FormData from 'form-data'
import axios from 'axios'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
import { Readable } from 'stream'

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'Mozilla/5.0 (Linux; Android 10)',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
]

function randomUA() {
  return userAgents[Math.floor(Math.random() * userAgents.length)]
}

function unwrapMessage(m) {
  let n = m
  while (
    n?.viewOnceMessage?.message ||
    n?.viewOnceMessageV2?.message ||
    n?.ephemeralMessage?.message
  ) {
    n =
      n.viewOnceMessage?.message ||
      n.viewOnceMessageV2?.message ||
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

async function downloadToBuffer(WA, media, type) {
  const stream = await WA.downloadContentFromMessage(media, type)
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

async function uploadToCatbox(buffer) {
  const detected = await fileTypeFromBuffer(buffer)
  const ext = detected?.ext || 'bin'
  const mime = detected?.mime || 'application/octet-stream'
  const filename = `${Date.now()}_${crypto.randomBytes(3).toString('hex')}.${ext}`

  let lastError

  for (let i = 0; i < 3; i++) {
    try {
      const form = new FormData()
      const stream = Readable.from(buffer)

      form.append('reqtype', 'fileupload')
      form.append('fileToUpload', stream, {
        filename,
        contentType: mime,
        knownLength: buffer.length
      })

      const res = await axios.post(
        'https://catbox.moe/user/api.php',
        form,
        {
          headers: {
            ...form.getHeaders(),
            'User-Agent': randomUA()
          },
          timeout: 60000,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          validateStatus: () => true
        }
      )

      if (res.status === 200 && typeof res.data === 'string') {
        return res.data.trim()
      }

      lastError = `${res.status} - ${JSON.stringify(res.data)}`
    } catch (e) {
      lastError = e.message
    }
  }

  throw new Error(lastError)
}

let handler = async (msg, { conn, wa, command }) => {
  const chatId = msg.key.remoteJid
  const pref = global.prefixes?.[0] || '.'

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

  try {
    let type
    let media

    if (quoted.imageMessage) {
      type = 'image'
      media = quoted.imageMessage
    } else if (quoted.videoMessage) {
      type = 'video'
      media = quoted.videoMessage
    } else if (quoted.audioMessage) {
      type = 'audio'
      media = quoted.audioMessage
    } else if (quoted.stickerMessage) {
      type = 'sticker'
      media = quoted.stickerMessage
    } else {
      throw new Error('Tipo no permitido')
    }

    const WA = ensureWA(wa, conn)
    if (!WA) throw new Error('WA no disponible')

    const buffer = await downloadToBuffer(
      WA,
      media,
      type === 'sticker' ? 'sticker' : type
    )

    if (buffer.length > 200 * 1024 * 1024) {
      throw new Error('Archivo muy grande')
    }

    const url = await uploadToCatbox(buffer)

    await conn.sendMessage(
      chatId,
      { text: `✅ Subido\n${url}` },
      { quoted: msg }
    )

    await conn.sendMessage(chatId, { react: { text: '✅', key: msg.key } })

  } catch (e) {
    await conn.sendMessage(
      chatId,
      { text: `❌ Error\n${e.message}` },
      { quoted: msg }
    )

    await conn.sendMessage(chatId, { react: { text: '❌', key: msg.key } })
  }
}

handler.command = ['tourl']
handler.help = ['tourl']
handler.tags = ['herramientas']

export default handler