const Discord = require("discord.js");

module.exports = async(client, msg) => {
    
    if(
        msg.author.bot ||
        !msg.guild
    ) return;

    // Getting the prefix of a guild
    var guildPrefix = client.db.get(msg.guild.id).prefix;

    // If client mentionned
    if(msg.content.startsWith("<@591530190094598144>") || msg.content.startsWith("<@!591530190094598144>")){

        var embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`Hey ! My prefix on this guild is [ ${guildPrefix} ]\nYou can type ${guildPrefix}help to see my commands !`)
        msg.channel.send(embed);
    }

    if(!msg.content.startsWith(guildPrefix)) return;

    var args = msg.content.substring(guildPrefix.length).split(" ");
    var cmdName = args[0];

    if(cmdName === "test"){
        console.log("reçu")
        client.emit("guildMemberAdd", msg.member)
    }

    // Multifile system
    client.commands.forEach((command) => {
        if(command.info.name === cmdName || command.info.alias.includes(cmdName)){
            if(command.info.perm === "owner" && !client.config.ownerID.includes(msg.author.id)){
                return
            }else{
                command.run(client, msg, args);
            }
        }
    });
}