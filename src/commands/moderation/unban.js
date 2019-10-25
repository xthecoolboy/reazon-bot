const Discord = require('discord.js');
const moment = require('moment');

exports.run = async(client, msg, args) => {

    var id = args[1];

    if(!id || isNaN(id)){
        var errorEmbed = new Discord.MessageEmbed()
            .setTitle("⚠️ Error !")
            .setDescription("You have to tell the id to unban !")
            .setColor(client.config.embed.color)
        return msg.channel.send(errorEmbed);
    }

    msg.guild.members.unban(id).then((user) => {
        var embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle(`Ban Command`)
            .setDescription(`${client.config.emojis.success} User ( ${user.tag} ) was successfully unbanned !`)
        msg.channel.send(embed);
    })
}

exports.info =  {
    name : "unban",
    alias : [],
    perms : ["BAN_MEMBERS"],
    dir : __dirname,
    help : {
        desc : "Unban a member",
        usage : "[prefix]unban <id>",
        ex : "[prefix]unban 489495461472894996"
    }
}