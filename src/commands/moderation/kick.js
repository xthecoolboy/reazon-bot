const Discord = require('discord.js');
const moment = require('moment')

exports.run = (client, msg, args) => {

    msg.delete();

    if(!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(`This command require KICK_MEMBERS permission !`,  {code : true});

    var member = msg.mentions.members.first();
    var reason = args.slice(2).join(" ");

    if (!member) return msg.channel.send(`You have to mention a member !`,  {code : true});
    if(!reason){
        reason = "No reason given"
    }

    member.kick(reason).then((member) => {
        var kick_embed = new Discord.MessageEmbed()
            .setTitle("Kick Command")
            .addField("Member Kicked", `${member} ( ${member.user.tag} )`)
            .addField("Kicked by :", msg.author.username)
            .addField("When", moment().format("L"))
            .addField("Reason :", reason)
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
        ex : "[prefix]kick @JockeRider199 Bad Words"
    }
}