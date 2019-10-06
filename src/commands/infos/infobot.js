const Discord = require('discord.js');

exports.run = (client, msg, args) => {
    const { version } = require("discord.js");
    let os = require('os');

    var infobot = new Discord.MessageEmbed()
        .setAuthor("Check informations from Reazon#8778", client.user.avatarURL())
        .addField("•📌 Versions :", "NodeJS : " + "`v11.11.0`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "", true)
        .addField("•📊 Stats :", "`Guilds size : "+client.guilds.size+"`" + "\n `Members size : " +client.users.size+"`", true)
        .addField("•👥 Developers :", "`Nivys | Kaly#0822`\n`JockeRider199#2627`\n`-ㅡ ㅓ Max ㅏ ㅡ-#7714`", true)
        .addField("•💾 Herberger :", "Plateform : " + "`" +  `${os.platform()}`+ "` \n Architecture : " + "`" + `${os.arch()}` + "` \n Processor : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
        .addField("•📰 Heberger config :", "Memory used : " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB` | API latency :" + "`" + `${Math.round(client.ws.ping)}` + " ms`")
        .addField("•✅ Online since :", (Math.round(client.uptime / (1000 * 60 * 60))) + ' hours  ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' seconds ')
        .addField("•🌍 Bot make in :", "`France`\n`Belgian`", true)
        .addField("•📡 Héberged in :", "`West Europa`", true)
        .setColor(client.config.embed.color)
    msg.channel.send(infobot)
    
}

exports.info = {
    name : "botinfo",
    alias : ["bot-info", "info-bot", "infobot"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Give infos about me :D",
        usage : "[prefix]botinfo",
        ex : "/"
    }
}