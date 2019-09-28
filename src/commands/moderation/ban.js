const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, message, args) => {
    var reason = args.join(" ").slice();
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("Tu n'as pas la permission de faire ça ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_permissions)
    }
    if (message.member.hasPermission("BAN_MEMBERS")) {
        const member = message.mentions.members.first();
        if (!member) {
            var error_mention = new Discord.RichEmbed()
            .setDescription("Mentionne un utilisateur ! :x: ")
            .setColor(config.embed.color)
        message.channel.send(error_mention)
        }
        member.ban().then(member => {
        var ban_embed = new Discord.RichEmbed()
            .setDescription("Nouveau BAN ! :hammer: ")
            .addField("Membre banni", member)
            .addField("Par :", message.author.username)
            .addField("Le :", moment().format("LS"))
            .addField("Raison :", reason)
            .setColor(config.embed.color)
       message.channel.send(ban_embed).catch(console.error);
    })
    }
    message.delete();
}

exports.info = {
    name: "ban"
}