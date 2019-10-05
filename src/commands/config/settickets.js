const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete();

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission !", {code : true});

    var role = msg.mentions.roles.first();
    var category = args[2];
    var msgContent = args.slice(3).join(" ");

    if(args[1] === "stop"){
        client.db.delete(msg.guild.id, "ticket");
        var embed = new Discord.MessageEmbed()
            .setTitle(`✅ Ticket Configuration`)
            .setDescription("I'll stop ticket system !")
            .setColor(client.config.embed.color)
        return msg.channel.send(embed);
    }

    if(!role) return msg.channel.send(`Parameter role is not declared ! Please mention a role !`, {code : true});
    if(!category) return msg.channel.send(`Parameter category is not declared !`, {code : true});
    if(category){
        if(isNaN(category)){
            category = msg.guild.channels.find((c) => c.type === "category" && c.name.toLowerCase() === args[2].toLowerCase());
            if(!category){
                return msg.channel.send(`I can't find this category !`);
            }
        }else{
            category = msg.guild.channels.find((c) => c.type === "category" && c.id === args[2]);
            if(!category){
                return msg.channel.send(`I can't find this category !`);
            }
        }
    }
    if(!msgContent) return msg.channel.send(`Parameter msgContent is not declared !`, {code : true});
    if(msgContent.length > 500) return msg.channel.send("Parameter msgContent is not valid ! The result can't be longer than 500 characters !", {code : true});

    client.db.set(msg.guild.id, {
        role : role.id,
        category : category.id,
        msgContent : msgContent
    }, "ticket");

    var embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle("Ticket Configuration")
        .setDescription(`Ticket System updated !\n\nTicket Category : ${category.name}\nTicket Msg : \`${msgContent}\`\nSupport Role : ${role}`);
    msg.channel.send(embed);

}

exports.info = {
    name : "setticket",
    alias : [],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Configure the ticket system\n\nFor ticket message, there are parameters :\n{user} => mention the user\n{support} => mention the support role\n{name} => returns the user's username\n\n**To stop this function run command `setticket stop`**",
        usage : "[prefix]setticket <@mention role support> <category name | category id> <ticket message>",
        ex : "[prefix]setticket @Support ticket Thanks to contact us {user} !"
    }
}