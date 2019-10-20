const Discord = require("discord.js");
const getos = require("getos");

module.exports = async(client, msg) => {
    
    if(
        msg.author.bot ||
        !msg.guild
    ) return;

    // Getting the prefix of a guild
    var guildPrefix = client.db.get(msg.guild.id).prefix;

    // If client mentionned
    if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)){

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

            // Check if command permissions are valid
            var permissions = require("../discord-permissions.json");
            command.info.perms.forEach((perm) => {
                if(!permissions.includes(perm)) throw new Error(`In the command ${command.info.name}, permission ${perm} is invalid !`);
            });
            
            var system = null;
            getos((e, os) => {
                if(e) console.log(e);

                system = os.os
            })

            switch(system){
                case "win32":
                    if(command.info.dir.split("\\").pop() === "owner" && !client.config.ownerID.includes(msg.author.id)){
                        var errorEmbed = new Discord.MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setDescription(`${client.config.emojis.error} You do not have the necessary permissions (\`BOT OWNER\`)`);
                        return msg.channel.send(errorEmbed);
                    }
                    break;
                default:
                    if(command.info.dir.split("/").pop() === "owner" && !client.config.ownerID.includes(msg.author.id)){
                        var errorEmbed = new Discord.MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setDescription(`${client.config.emojis.error} You do not have the necessary permissions (\`BOT OWNER\`)`);
                        return msg.channel.send(errorEmbed);
                    }
                    break;
            }

            // Check if msg author has required permissions
            if(!msg.member.permissions.has(command.info.perms)){
                var errorEmbed = new Discord.MessageEmbed()
                    .setColor(client.config.embed.color)
                    .setDescription(`${client.config.emojis.error} You do not have the necessary permissions (\`${command.info.perms.join(", ")}\`)`)
                msg.channel.send(errorEmbed);
            }else{
                msg.delete().catch(() => {});
                command.run(client, msg, args);
            }
        }
    });
}