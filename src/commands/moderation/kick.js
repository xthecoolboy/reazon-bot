const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, msg, args) => {

    msg.delete();

    if(!msg.member.permissions.has("KICK_MEMBERS")) {
        
        var error_perms = new Discord.MessageEmbed()
            .setTitle("⚠️ Error !")
            .setDescription("This command required the permission KICK_MEMBERS !")
            .setColor(client.config.embed.color)
        msg.channel.send(error_perms).catch(console.error);
    }

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

    member.kick(reason).then((member) => {

        var kick_embed = new Discord.MessageEmbed()
            .setTitle("Kick Command")
            .addField("👤 Member Kicked", `${member} ( ${member.user.tag} )`)
            .addField("🔨 By", msg.author.username)
            .addField("🕖 When", moment().format("L"))
            .addField("💬 Reason", reason)
            .setColor(client.config.embed.color)
        msg.channel.send(kick_embed).catch(console.error);
    })
}

exports.info = {
    name: "kick",
    alias : [],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Kick a member",
        usage : "[prefix]kick <@mention> [reason]",
        ex : "[prefix]kick @JockeRider199 Bad words"
    }
}