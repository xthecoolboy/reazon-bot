const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, msg, args) => {

    var member = msg.mentions.members.first();
    var reason = args.slice(2).join(" ");

    if (!member) {

        var error_mention = new Discord.MessageEmbed()
            .setTitle("⚠️ Error !")
            .setDescription("You have to mention a member !")
            .setColor(client.config.embed.color)
        msg.channel.send(error_mention).catch(console.error);
    }
    if(!reason){
        reason = "No reason given"
    }

    member.ban({days : 7, reason : reason}).then((member) => {

        var ban_embed = new Discord.MessageEmbed()
            .setTitle("Ban Command")
            .addField("👤 Member Banned", `${member} ( ${member.user.tag} )`)
            .addField("🔨 By", msg.author.username)
            .addField("🕖 When", moment().format("L"))
            .addField("💬 Reason", reason)
            .setColor(client.config.embed.color)
        msg.channel.send(ban_embed).catch(console.error);
    })
}

exports.info = {
    name: "ban",
    alias : [],
    perms : ["BAN_MEMBERS"],
    dir : __dirname,
    help : {
        desc : "Ban a member",
        usage : "[prefix]ban <@mention> [reason]",
        ex : "[prefix]ban @JockeRider199 Bad words"
    }
}
