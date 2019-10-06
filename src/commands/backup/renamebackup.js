const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    msg.delete()

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission !");

    var name = args[1];
    var args2 = msg.content.split("\"")
    var newName = args2[1];

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
        .setDescription(`This will rename your backup.`)
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
            backup.rename(name, newName);
        }
    })
}

exports.info = {
    name : "renamebackup",
    alias : [],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Rename a backup",
        usage : "[prefix]renamebackup <oldName> \"<newName>\"",
        ex : "[prefix]renamebackup test-01-01 \"test\""
    }
}