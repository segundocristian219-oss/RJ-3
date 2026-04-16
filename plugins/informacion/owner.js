import pkg from '@whiskeysockets/baileys'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = pkg

let handler = async (m, { conn }) => {

  await conn.sendMessage(m.chat, { react: { text: "🔥", key: m.key } })

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    )
    return imageMessage
  }

  const owners = [
    {
      name: 'Hernandez.𝗑𝗒𝗓',
      desc: `𝖢𝗋𝖾𝖺𝖽𝗈𝗋 𝗒 𝖣𝖾𝗌𝖺𝗋𝗋𝗈𝗅𝗅𝖺𝖽𝗈𝗋 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝖣𝖾 𝑹𝑱 𝑩𝑶𝑻 👑`,
      image: 'https://cdn.russellxz.click/9dd34316.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/5212213479743' }
      ]
    },
    {
      name: 'Rich.𝖿𝗀𝗓',
      desc: '𝖴𝗇𝗈 𝖣𝖾 𝖫𝗈𝗌 𝖨𝗇𝗏𝖾𝗋𝗌𝗂𝗈𝗇𝗂𝗌𝗍𝖺𝗌 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅𝖾𝗌 🗣️',
      image: 'https://cdn.russellxz.click/39157e06.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/5216644962918' }
      ]
    },
    {
      name: 'Hernandez.𝗌𝗍𝖺𝖿𝖿',
      desc: '𝖬𝗂𝖾𝗆𝖻𝗋𝗈 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 𝖣𝖾𝗅 𝖤𝗊𝗎𝗂𝗉𝗈 𝑹𝑱 𝑩𝑶𝑻 ⚙️',
      image: 'https://files.catbox.moe/piu53i.jpg',
      buttons: [
        { name: 'WhatsApp', url: 'https://wa.me/5212213479743' }
      ]
    }
  ]

  let cards = []
  for (let owner of owners) {
    const imageMsg = await createImage(owner.image)

    let formattedButtons = owner.buttons.map(btn => ({
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: btn.name,
        url: btn.url
      })
    }))

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*${owner.name}*\n${owner.desc}`
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMsg
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: formattedButtons
      })
    })
  }

  const slideMessage = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
            })
          })
        }
      }
    },
    {}
  )

  await conn.relayMessage(m.chat, slideMessage.message, { messageId: slideMessage.key.id })
}

handler.command = handler.help = ['donar', 'owner', 'cuentasoficiales', 'creador', 'cuentas']

export default handler