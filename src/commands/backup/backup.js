const Discord = require("discord.js"),
backup = require("../../functions/backup");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send(`This command require ADMINISTRATOR permission !`);

    var result = await backup.getGuildBackup(msg.guild.id)

    console.log(result.length)
    if(result.length >= 5) return msg.channel.send(`You can't have more than 5 backups !`)

    backup.create(msg.guild).then((backupID) => {

        var embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`Backup created with sucess ! I sent you the restore code in DM`)

        msg.channel.send(embed);

        var guildPrefix = client.db.get(msg.guild.id).prefix;

        var pvEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`Backup created with sucess !`)
            .addField(`Backup Code`, backupID)
            .addField(`How to restore ?`, `${guildPrefix}restore ${backupID}`)
        msg.author.send(pvEmbed);
    })
}

exports.info = {
    name : "backup",
    alias : ["save"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Create a backup of the server",
        usage : "[prefix]backup",
        ex : "/"
    }
}