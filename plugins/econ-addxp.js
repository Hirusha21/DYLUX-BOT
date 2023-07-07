//import db from '../lib/database.js'

let handler = async(m, { conn, text }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0]
   else who = m.chat
   if (!who) throw '✳️ Tag the user'
   let txt = text.replace('@' + who.split`@`[0], '').trim()
   if (!txt) throw '✳️ Enter the amount of *XP* you want to add'
   if (isNaN(txt)) throw ' 🔢 numbers only'
   let xp = parseInt(txt)
   let exp = xp
  
   if (exp < 1) throw '✳️ Minimum is *1*'
   let users = global.db.data.users
   users[who].exp += xp

   await m.reply(`≡ *XP ADDED*
┌──────────────
▢ *Total:* ${xp}
└──────────────`)
  conn.fakeReply(m.chat, `▢ You received \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['econ']
handler.command = ['addxp']
handler.owner = true

export default handler