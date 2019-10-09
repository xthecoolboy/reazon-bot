const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    var newmsg = await msg.channel.send("Ping ?")

    var embed = new Discord.MessageEmbed()
    .setColor(client.config.embed.color)
    .addField('Ping API : ', Math.floor(client.ws.ping) + 'ms')
    .addField('Ping Bot : ', ` ${newmsg.createdTimestamp - msg.createdTimestamp}` + 'ms')
    .setFooter(client.config.embed.footer)
        
    newmsg.delete()
    msg.channel.send(embed)
}

exports.info = {
    name : "ping",
    alias : [],
    perms : [],
    dir : __dirname,
    help : {
        desc : "Show the ping of the bot",
        usage : "[prefix]ping",
        ex : "/"
    }
}