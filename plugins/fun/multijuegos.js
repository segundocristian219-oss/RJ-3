let handler = async (m, { conn, command, text, usedPrefix }) => {

if (!m.mentionedJid || m.mentionedJid.length === 0)
throw `${lenguajeGB['smsAvisoMG']()} 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 @𝙏𝘼𝙂 𝙊 𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 @𝙏𝘼𝙂 𝙊𝙍 𝙏𝙔𝙋𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀`

let user = '@' + m.mentionedJid[0].split('@')[0]

if (command == 'cachuda') {
let juego = `_*${user.toUpperCase()}* ES/IS *${(100).getRandom()}%* GAY 🏳️‍🌈_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'adoptada') {
let juego = `_*${user.toUpperCase()}* ES/IS *${(100).getRandom()}%* ADOPTADA, SUS PADRES SE FUERON POR PAÑALES 😞😂_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'cachudo') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* CACHUDO 😂😂_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'adoptado') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* ADOPTADO, SUS PADRES SE FUERON POR PAÑALES 😞😂_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'sinpito') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* SIN PITO, ¿ASÍ CREE QUE LA TIENE GRANDE? 😂 XD*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'sinpoto') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* SIN POTO, MÁS PLANA 😂 XD*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'sintetas') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* SIN TETAS 😂 XD*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'feo') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* FEO 🤢*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'fea') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* FEA, ¿ASÍ SE CREÍA HERMOSA? 😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'negro') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* NEGRO 👨🏾‍🦱, MÁS NEGRO QUE SU POTO 😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'negra') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* NEGRA 👱🏾‍♀️, MÁS NEGRA QUE SU CUCA 😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'love2') {
let juego = `❤️❤️ *MEDIDOR DE AMOR* ❤️❤️\n*_EL AMOR DE ${user.toUpperCase()} ES DE ${(100).getRandom()}%_*`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'casar') {
let juego = `_*${user.toUpperCase()}* SE CASA CON *${(100).getRandom()}%* DE SU CRUSH 💍*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'divorcio') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE PROBABILIDAD DE DIVORCIARSE 💔😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'enana') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* ENANA 🧚‍♀️😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'enano') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* ENANO 🧚‍♂️😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'gay') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* GAY 🏳️‍🌈😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'juegos') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE SUERTE EN LOS JUEGOS 🎮😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'lesbiana') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* LESBIANA 🌈🤭*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'manca') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* MANCA 😭😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'manco') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* MANCO 😭😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'matrimonios') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE PROBABILIDAD DE MATRIMONIOS 💍😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'pajera') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* PAJERA 😳✋😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'pajero') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* PAJERO 😳✋😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'personalidad') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE PERSONALIDAD 🔥😎*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'peruana') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* PERUANA 🇵🇪😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'peruano') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* PERUANO 🇵🇪😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'poema') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE SER POETA 📜💕*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'ppt') {
let juego = `_*${user.toUpperCase()}* TIENE *${(100).getRandom()}%* DE SER PRO EN PPT ✂️🪨📄*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'puto') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* PUTO 😂🔥*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'rata') {
let juego = `_*${user.toUpperCase()}* ES *${(100).getRandom()}%* RATA 🐀😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

if (command == 'pegar') {
let juego = `_*${user.toUpperCase()}* TE PEGA CON *${(100).getRandom()}%* DE FUERZA 🥊😂*_`.trim()
await conn.reply(m.chat, juego, m, { mentions: m.mentionedJid })
}

}

handler.help = [
'lov2','cachuda','negra','adoptado','sintetas','sinpoto','sinpito','feo','cachudo','fea','negro','adoptada',
'casar','divorcio','enana','enano','gay','juegos','lesbiana','manca','manco','matrimonios','pajera','pajero',
'personalidad','peruana','peruano','poema','ppt','puto','rata','pegar'
].map(v => v + ' @tag')

handler.tags = ['fun']

handler.command = /^love2|cachuda|adoptado|adoptada|sintetas|sinpoto|sinpito|feo|fea|cachudo|negro|negra|casar|divorcio|enana|enano|gay|juegos|lesbiana|manca|manco|matrimonios|pajera|pajero|personalidad|peruana|peruano|poema|ppt|puto|rata|pegar/i

handler.exp = 100

export default handler