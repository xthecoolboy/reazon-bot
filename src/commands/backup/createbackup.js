const Discord = require("discord.js"),
backup = require("easy-save-discord");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    var backups = await backup.listGuildBackup(msg.guild.id)
    var nbre = backups.length;
    var dispo = (client.config.backups.max - nbre)

    if(dispo > 0){
        var sureEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle(`Create a backup ?`)
            .setDescription(`You have ${dispo} slots available.`)
        
        var collectMsg = await msg.channel.send(sureEmbed);
        collectMsg.react("✅");

        const collector = new Discord.ReactionCollector(collectMsg, ((reaction, user) => user.id === msg.author.id), {time : 8000});
        
        collector.on("collect", (reaction) => {
            if(reaction.emoji.name === "✅"){
                collectMsg.reactions.removeAll();
                var succesEmbed = new Discord.MessageEmbed()
                    .setColor("#ff000")
                    .setTitle("✅ Success")
                    .setDescription(`Your backup has been created !`);
                collectMsg.edit({embed : succesEmbed})
                backup.create(msg.guild);
            }
        })
    }else{
        var errorEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`You have no more slots`)
        msg.channel.send(errorEmbed)
    }
}

exports.info = {
    name : "createbackup",
    alias : ["save"],
    perms : ["ADMINISTRATOR"],
    dir : __dirname,
    help : {
        desc : "Create a backup of the server",
        usage : "[prefix]createbackup",
        ex : "/"
    }
}