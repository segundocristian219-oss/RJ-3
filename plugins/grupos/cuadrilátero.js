let versusData = {} // Guarda el estado por mensaje

const aliasesMX = ['mx', 'méxico', 'mexico', 'méx', 'mex']
const aliasesCO = ['co', 'colombia', 'col']

let handler = async (m, { conn, args }) => {
  if (args.length === 0) {
    await conn.sendMessage(m.chat, { text: '𝐓𝐢𝐞𝐧𝐞𝐬 𝐪𝐮𝐞 𝐞𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚𝐫 𝐥𝐚 𝐡𝐨𝐫𝐚 𝐲 𝐞𝐥 𝐩𝐚𝐢́𝐬 ❇️' })
    return
  }

  let lastArgRaw = args[args.length - 1]
  let lastArg = lastArgRaw.toLowerCase().replace(/,$/, '')

  let zonaInput = null
  if (aliasesMX.includes(lastArg)) {
    zonaInput = 'mx'
    args.pop()
  } else if (aliasesCO.includes(lastArg)) {
    zonaInput = 'co'
    args.pop()
  } else {
    await conn.sendMessage(m.chat, { text: '𝐄𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚 𝐮𝐧 𝐩𝐚𝐢́𝐬 𝐯𝐚́𝐥𝐢𝐝𝐨.\nEj: 𝟑 𝐩𝐦 𝐦𝐱, 𝟏𝟔 𝐜𝐨, 𝟒 𝐩𝐦 𝐦é𝐱𝐢𝐜𝐨' })
    return
  }

  const timeStr = args.join(' ').toUpperCase().trim()
  const match = timeStr.match(/^(\d{1,2})(?:\s*(AM|PM))?$/i)

  let horaInput = null
  if (match) {
    let hour = parseInt(match[1])
    const ampm = match[2] || null
    if (ampm) {
      if (ampm === 'PM' && hour < 12) hour += 12
      if (ampm === 'AM' && hour === 12) hour = 0
    }
    if (hour >= 0 && hour <= 23) horaInput = hour
  }

  if (horaInput === null) {
    await conn.sendMessage(m.chat, { text: '𝐇𝐨𝐫𝐚 𝐢𝐧𝐯𝐚́𝐥𝐢𝐝𝐚. Ej:\n.6vs6 3 pm mx\n.6vs6 16 co' })
    return
  }

  function format12h(h) {
    let ampm = h >= 12 ? 'PM' : 'AM'
    let hour12 = h % 12
    if (hour12 === 0) hour12 = 12
    return `${hour12} ${ampm}`
  }

  let mexHora, colHora
  if (zonaInput === 'mx') {
    mexHora = horaInput
    colHora = (horaInput + 1) % 24
  } else {
    colHora = horaInput
    mexHora = (horaInput + 23) % 24
  }

  const mexText = format12h(mexHora)
  const colText = format12h(colHora)

  const template = generarVersus([], [], mexText, colText)
  const sent = await conn.sendMessage(m.chat, { text: template, mentions: [] })

  versusData[sent.key.id] = {
    chat: m.chat,
    escuadra: [],
    suplentes: [],
    mexText,
    colText
  }
}
handler.help = ['interna6vs6']
handler.tags = ['freefire']
handler.command = /^\.?(interna6vs6)$/i
handler.group = true
handler.botAdmin = true
export default handler

function generarVersus(escuadra, suplentes, mexText = '  ', colText = '  ') {
  function formatEscuadra(arr) {
    let out = ''
    for (let i = 0; i < 6; i++) { // máximo 6 jugadores
      let icon = i === 0 ? '👑' : '🥷🏻'
      out += arr[i] ? `${icon} ┇ @${arr[i].split('@')[0]}\n` : `${icon} ┇ \n`
    }
    return out.trimEnd()
  }

  function formatSuplentes(arr) {
    let out = ''
    for (let i = 0; i < 2; i++) {
      out += arr[i] ? `🥷🏻 ┇ @${arr[i].split('@')[0]}\n` : `🥷🏻 ┇ \n`
    }
    return out.trimEnd()
  }

  return `*𝐈𝐍𝐓𝐄𝐑𝐍𝐀  6 𝐕𝐒 6*

*𝐇𝐎𝐑𝐀𝐑𝐈𝐎𝐒*;
🇲🇽 *MEXICO* : ${mexText}
🇨🇴 *COLOMBIA* : ${colText}

*𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄𝐒*;

*𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 Ú𝗡𝗜𝗖𝗔*
${formatEscuadra(escuadra)}

ㅤʚ *𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒*:
${formatSuplentes(suplentes)}


*𝖲𝗈𝗅𝗈 𝗋𝖾𝖺𝖼𝖼𝗂𝗈𝗇𝖺 𝖼𝗈𝗇:*

> 「 ❤️ 」𝐏𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐫  
> 「 👍 」𝐒𝐮𝐩𝐥𝐞𝐧𝐭𝐞  
> 「 👎 」𝐒𝐚𝐥𝐢𝐫 𝐃𝐞 𝐋𝐚 𝐋𝐢𝐬𝐭𝐚  
> 「 ❌ 」𝐑𝐞𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐋𝐢𝐬𝐭𝐚      
`
}

conn.ev.on('messages.upsert', async ({ messages }) => {
  for (let msg of messages) {
    if (!msg.message?.reactionMessage) continue
    let msgID = msg.message.reactionMessage.key.id
    let data = versusData[msgID]
    if (!data) continue

    let user = msg.key.participant || msg.key.remoteJid
    let emoji = msg.message.reactionMessage.text
    const isInAnyList =
      data.escuadra.includes(user) ||
      data.suplentes.includes(user)

    if (emoji === '👎' && !isInAnyList) continue

    let isAdmin = false
    try {
      let groupMetadata = await conn.groupMetadata(data.chat)
      let participant = groupMetadata.participants.find(p => p.id === user)
      isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin'
    } catch {}

    if (emoji === '❌' && isAdmin) {
      const hasPlayers = data.escuadra.length + data.suplentes.length > 0
      if (!hasPlayers) continue
      data.escuadra = []
      data.suplentes = []
      let nuevoTexto = generarVersus(data.escuadra, data.suplentes, data.mexText, data.colText)
      try { await conn.sendMessage(data.chat, { delete: msg.message.reactionMessage.key }) } catch {}
      let sent = await conn.sendMessage(data.chat, { text: nuevoTexto, mentions: [] })
      delete versusData[msgID]
      versusData[sent.key.id] = data
      continue
    }

    data.escuadra = data.escuadra.filter(u => u !== user)
    data.suplentes = data.suplentes.filter(u => u !== user)

    if (emoji === '❤️') {
      if (data.escuadra.length < 6) data.escuadra.push(user)
    } else if (emoji === '👍') {
      if (data.suplentes.length < 2) data.suplentes.push(user)
    } else if (emoji === '👎') {
      // Ya fue eliminado arriba
    } else continue

    let nuevoTexto = generarVersus(data.escuadra, data.suplentes, data.mexText, data.colText)
    let mentions = [...data.escuadra, ...data.suplentes]
    try { await conn.sendMessage(data.chat, { delete: msg.message.reactionMessage.key }) } catch {}
    let sent = await conn.sendMessage(data.chat, { text: nuevoTexto, mentions })
    delete versusData[msgID]
    versusData[sent.key.id] = data
  }
})p