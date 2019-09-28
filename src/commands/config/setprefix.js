const Discord = require("discord.js");

exports.run = async (client, msg, args) => {

    if(msg.author.id !== msg.guild.ownerID){
        return msg.channel.send("This command is reserved to the guild's owner !", {code : true});
    }

    // New prefix
    var newPrefix = args[1];
    var db = client.db;
    if(newPrefix.length > 5) return msg.channel.send(`This prefix is not valid ! The new prefix can't be longer than 5 characters`);

    // Writing database
    db.set(msg.guild.id, newPrefix, "prefix");

    // Creating and sending discord embed
    var embed = new Discord.RichEmbed()
        .setTitle("Prefix Changes")
        .setDescription(`Prefix Changed ! New value : [ ${newPrefix} ]`)
        .setColor(client.config.embed.color)
        .setFooter(client.config.embed.footer)

    msg.channel.send(embed);
}

exports.info = {
    name : "setprefix",
    alias : [],
    owner : null
}
