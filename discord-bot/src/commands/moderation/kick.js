const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, message, args) => {
    var reason = args[2]
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("Permissions insufisantes ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_permissions)
    }
    if (message.member.hasPermission("KICK_MEMBERS")) {
        const member = message.mentions.members.first();
        if (!member) {
            var error_mention = new Discord.RichEmbed()
            .setDescription("Mentionnes un utilisateur ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_mention)
        }
        member.ban(reason).then(member => {
            var ban_embed = new Discord.RichEmbed()
            .setDescription("Nouveau Kick !")
            .setColor(config.embed.color)
            .addField("Membre kick :", member)
            .addField("Par :", message.author.username)
            .addField("Le :", moment().format("LS"))
            .addField("Raison :", reason)
        message.channel.send(ban_embed).catch(console.error);
    })
    }
    message.delete();
}

exports.info = {
    name: "kick"
}