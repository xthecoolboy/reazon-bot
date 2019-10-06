const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission !");

    backup.listGuildBackup(msg.guild.id).then(async(results) => {
        
        if(results.length > 0){

            var embed = new Discord.MessageEmbed()
<<<<<<< HEAD:src/commands/backup/guild-backups.js
            .setColor(client.config.embed.color)
            .setDescription(`📦🗃 There are your backups for this guild : \n\n${list}`)
=======
                .setColor(client.config.embed.color)
                .setTitle(`Guild backups list`)
                results.forEach((result) => {
                    var position = (results.indexOf(result) + 1)
                    embed.addField(`Usage : ${position}/${client.config.backups.max}`, "```\n" + result + "\n```")
                })
>>>>>>> b7dca8f4db1ff9a4c1e7418af9f6ae82c2070194:src/commands/backup/backuplist.js
            msg.channel.send(embed)
        }else{
            msg.channel.send(`📦❌ This guild hasn't any backup !`, {code : true});
        }
    });
}

exports.info = {
    name : "backuplist",
    alias : ["backupslist"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "returns a list of guild's backup",
        usage : "[prefix]backuplist",
        ex : "/"
    }
}