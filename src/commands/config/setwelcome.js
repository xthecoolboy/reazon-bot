const Discord = require("discord.js");

exports.run = async (client, msg, args) => {

    msg.delete();

    var db = client.db;
   
    if(args[1] === "stop"){
        db.delete(msg.guild.id, "welcomemsg");
        var embed = new Discord.MessageEmbed()
            .setTitle(`Welcome message Updated !`)
            .setDescription("I'll stop welcome message!")
            .setColor(client.config.embed.color)
        return msg.channel.send(embed);
    }

    const channel = msg.mentions.channels.first();
    if(!channel) return msg.channel.send("parameter channel is invalid !", {code : true});

    var msgContent = args.slice(2).join(" ");
    if(!msgContent) return msg.channel.send("Parameter msgContent is invalid !", {code : true})
    
    var embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle("Welcome Configuration")
        .setDescription(`Welcome System updated !\n\nChannel : ${channel}\n Msg : \`${msgContent}\``);
    msg.channel.send(embed);

    client.db.set(msg.guild.id, {
        channel : channel.id,
        msgContent : msgContent
    }, "welcomemsg");
}

exports.info = {
    name : "setwelcome",
    alias : [],
    perms : ["ADMINISTRATOR"],
    dir : __dirname,
    help : {
        desc : "Configure the welcome system\n\nParameters for welcome message : \n{user} => mention the new member\n{guild} => The server name\n{count} => The member count",
        usage : "[prefix]setwelcome <#channel> <msgContent>",
        ex : "[prefix]setwelcome #welcome Hi {user} !"
    }
}