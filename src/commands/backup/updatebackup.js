const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    msg.delete()

    var name = args.slice(1).join("-");

    var list = await backup.listGuildBackup(msg.guild.id);

    if(!list.includes(name)){
        var errorEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`This backup doesn't exist !`);
        return msg.channel.send(errorEmbed);
    }

    var sureEmbed = new Discord.MessageEmbed()
        .setColor(`#ff000`)
        .setTitle(`Update Backup ?`)
        .setDescription(`This will replace your backup.`)
    var collectMsg = await msg.channel.send(sureEmbed);
    collectMsg.react("✅");
    const collector = new Discord.ReactionCollector(collectMsg, ((reaction, user) => user.id === msg.author.id), {time : 8000});

    collector.on("collect", async(reaction) => {
        if(reaction.emoji.name === "✅"){
            collectMsg.reactions.removeAll();
            var succesEmbed = new Discord.MessageEmbed()
                .setColor("#ff000")
                .setTitle("✅ Success")
                .setDescription(`Your backup has been updated !`);
            collectMsg.edit({embed : succesEmbed})
            await backup.delete(name);
            var backupID = await backup.create(msg.guild);
            backup.rename(backupID, name)
        }
    })
}

exports.info = {
    name : "updatebackup",
    alias : [],
    perms : ["ADMINISTRATOR"],
    dir : __dirname,
    help : {
        desc : "Update a backup",
        usage : "[prefix]updatebackup <name>",
        ex : "[prefix]updatebackup test"
    }
}