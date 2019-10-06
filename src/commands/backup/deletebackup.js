const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission ! ❌", {code : true});

    var backupID = args[1];

    if(!backupID){
        var errorEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`📦 parameter backupID is invalid !`)
        msg.channel.send(errorEmbed)
    }

    backup.fetch(backupID).then(async() => {
        var sureEmbed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle(`📦🗑 Delete this backup ?`)
            .setDescription(`\`${backupID}\` will be erased. Are you sure ?`)
        var collectMsg = await msg.channel.send(sureEmbed);
        collectMsg.react("✅");

        const collector = new Discord.ReactionCollector(collectMsg, ((reaction, user) => user.id === msg.author.id), {time : 8000});

        collector.on("collect", (reaction) => {
            if(reaction.emoji.name === "✅"){
                collectMsg.reactions.removeAll();
                var succesEmbed = new Discord.MessageEmbed()
                    .setColor("#ff000")
                    .setTitle("📦✅ Success")
                    .setDescription(`Your backup has been deleted !`);
                collectMsg.edit({embed : succesEmbed})
                backup.delete(backupID);
            }
        })
    }).catch(() => {
        var errorEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`📦⚠️ This backup doesn't exist !`);
        msg.channel.Send(errorEmbed);
    })
}

exports.info = {
    name : "deletebackup",
    perm : null,
    alias : [],
    dir : __dirname,
    help : {
        desc : "Delete a backup",
        usage : "[prefix]deletebackup <ID>",
        ex : "[prefix]deletebackup 0HJHC"
    }
}