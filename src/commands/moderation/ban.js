const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send(`This command require BAN_MEMBERS permissions`,  {code : true})

    var member = msg.mentions.members.first();
    var reason = args.slice(2).join(" ");

    if (!member) return msg.channel.send(`You have to mention a member !`, {code : true});
    if(!reason){
        reason = "No reason given"
    }

    member.ban(reason).then((member) => {

        var ban_embed = new Discord.RichEmbed()
            .setTitle("Ban Command")
            .addField("Banned member", `${member} ( ${member.user.tag} )`)
            .addField("By", msg.author.username)
            .addField("When", moment().format("L"))
            .addField("Reason", reason)
            .setColor(client.config.embed.color)
       msg.channel.send(ban_embed).catch(console.error);
    })
}

exports.info = {
    name: "ban",
    alias : [],
    perm : null
}