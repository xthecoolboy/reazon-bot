const Discord = require("discord.js"),
backup = require("../../functions/backup");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission !");

    backup.getGuildBackup(msg.guild.id).then(result => {
        
        if(result.length > 0){

            var list = result.join("\n")
            var embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`There are your backups for this guild : \n\n${list}`)
            msg.channel.send(embed)
        }else{
            msg.channel.send(`This guild hasn't any backup !`, {code : true});
        }
    });
}

exports.info = {
    name : "guild-backups",
    alias : ["guild-backup"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "returns a list of guild's backup",
        usage : "[prefix]guild-backups",
        ex : "/"
    }
}