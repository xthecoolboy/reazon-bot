const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, message, args) => {
    var reason = args.join(" ").slice();
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("Tu n'as pas la permission de faire ça ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_permissions)
    }
    if (message.member.hasPermission("KICK_MEMBERS")) {
        const member = message.mentions.members.first();
        if (!member) {
            var error_mention = new Discord.RichEmbed()
            .setDescription("Mentionne un utilisateur ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_mention)
        }
        member.ban().then(member => {
        var kick_embed = new Discord.RichEmbed()
            .setDescription("Nouveau KICK ! :wastebasket: ")
            .addField("Membre mute", member)
            .addField("Par :", message.author.username)
            .addField("Le :", moment().format("LS"))
            .addField("Raison :", reason)
            .setColor(config.embed.color)
       message.channel.send(kick_embed).catch(console.error);
    })
    }
    message.delete();
}

exports.info = {
    name: "mute"
}