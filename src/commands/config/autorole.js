const Discord = require("discord.js");

exports.run = async (client, msg, args) => {

    if(msg.author.id !== msg.guild.ownerID){
        return msg.channel.send("This command is reserved to the guild's owner !", {code : true});
    }

    var db = client.db;
    var role = msg.mentions.roles.first();

    if(args[1] === "stop"){
        db.delete(msg.guild.id, "autorole");
        var embed = new Discord.MessageEmbed()
            .setTitle(`AutoRole Updated !`)
            .setDescription("I'll stop adding role to new members !")
            .setColor(client.config.embed.color)
        return msg.channel.send(embed);
    }

    if(!role){
        role = args.slice(1).join(" ")
        role = msg.guild.roles.find((r) => r.name === role);
        if(!role){
            return msg.channel.send(`Parameter role is not valid !`, {code : true});
        }
    }

    db.set(msg.guild.id, role.id, "autorole");

    var compare = msg.guild.me.roles.highest.comparePositionTo(role);
    var embed = new Discord.MessageEmbed()
        .setTitle(`AutoRole Updated !`)
        .setDescription(`New value : ${role}`)
        .setColor(client.config.embed.color)
        if(compare <= 0){
            embed.addField(`:warning: Warning`, `My role is under the role to give, please move up my role !`); 
        }
    msg.channel.send(embed);    
}

exports.info = {
    name : "autorole",
    alias : [],
    perm : null,
    dir : __dirname
}