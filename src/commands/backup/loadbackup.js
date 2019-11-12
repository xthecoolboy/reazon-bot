const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

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
            .setTitle(`📦🗑 Load this backup ?`)
            .setDescription(`\`${backupID}\` will be loaded, this command will erase your server.`)
        var collectMsg = await msg.channel.send(sureEmbed);
        collectMsg.react("✅");

        const collector = new Discord.ReactionCollector(collectMsg, ((reaction, user) => user.id === msg.author.id), {time : 8000});

        collector.on("collect", (reaction) => {
            if(reaction.emoji.name === "✅"){
                collectMsg.reactions.removeAll();

                var succesEmbed = new Discord.MessageEmbed()
                    .setColor("#ff000")
                    .setTitle("📦✅ Success")
                    .setDescription(`Your backup has been loaded !`);
                collectMsg.edit({embed : succesEmbed})

                backup.load(backupID).then(() => {
                    msg.guild.channels.filter((c) => c.type === "text").first()
                    .send(succesEmbed);
                });
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
    name : "loadbackup",
    perms : ["ADMINISTRATOR"],
    alias : [],
    dir : __dirname,
    help : {
        desc : "Load a backup",
        usage : "[prefix]loadbackup <ID>",
        ex : "[prefix]loadbackup 0HJHC"
    }
}