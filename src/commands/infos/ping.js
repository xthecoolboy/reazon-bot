const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    var newmsg = await msg.channel.send("Ping ?")

    var embed = new Discord.RichEmbed()
    .setColor(client.config.embed.color)
    .addField('Ping API : ', Math.floor(client.ping) + 'ms')
    .addField('Ping Bot : ', ` ${newmsg.createdTimestamp - msg.createdTimestamp}` + 'ms')
    .setFooter(client.config.embed.footer)
        
    newmsg.delete()
    msg.channel.send(embed)
}

exports.info = {
    name : "ping",
    alias : [],
    perm : null,
    dir : __dirname
}