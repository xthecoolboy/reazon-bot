const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    backup.listGuildBackup(msg.guild.id).then(async(results) => {
        
        if(results.length > 0){

            var embed = new Discord.MessageEmbed()
                .setColor(client.config.embed.color)
                .setTitle(`Guild backups list`)
                results.forEach((result) => {
                    var position = (results.indexOf(result) + 1)
                    embed.addField(`Usage : ${position}/${client.config.backups.max}`, "```\n" + result + "\n```")
                })
            msg.channel.send(embed)
        }else{
            msg.channel.send(`This guild hasn't any backup !`, {code : true});
        }
    });
}

exports.info = {
    name : "backuplist",
    alias : ["backupslist"],
    perms : ["ADMINISTRATOR"],
    dir : __dirname,
    help : {
        desc : "returns a list of guild's backup",
        usage : "[prefix]backuplist",
        ex : "/"
    }
}