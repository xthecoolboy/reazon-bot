const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(args[1]){

        client.commands.forEach((cmd) => {

            if(
                args[1] === cmd.info.name ||
                cmd.info.alias.includes(args[1])
            ){
                var guildPrefix = client.db.get(msg.guild.id).prefix;
                var embed = new Discord.MessageEmbed()
                    .setColor(client.config.embed.color)
                    .setTitle(`Help for command : ${args[1]}`)
                    .setDescription(cmd.info.help.desc)
                    if(cmd.info.alias.length > 0){
                        embed.addField(`Alias`, "```\n" + cmd.info.alias.join(", ") + "\n```")
                    }else{
                        embed.addField(`Alias`, "```\n" + "No alias" + "\n```")
                    }
                    embed.addField(`Command Usage`, "```\n" + cmd.info.help.usage.replace("[prefix]", guildPrefix) + "\n```")
                    .addField(`Example`, "```\n" + cmd.info.help.ex.replace("[prefix]", guildPrefix) + "\n```")
                msg.channel.send(embed);
            }
        })

    }else{

        var whereEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription(`Where do you want the menu ?`)
            .addField(`:inbox_tray:`, `Here`, true)
            .addField(`:lock:`, `In DM`, true)
        var reactMsg = await msg.channel.send(whereEmbed);
        reactMsg.react("📥");
        reactMsg.react("🔒");

        var configCmds = [];
        var infosCmd = [];
        var moderationCmd = [];
        var backupCmds = [];
        var ownerCmds = [];
        var generalCmds = [];

        client.commands.forEach((cmd) => {
            var dir = cmd.info.dir.split("\\").pop();
            switch(dir){
                case "config":
                    configCmds.push(`\`${cmd.info.name}\``);
                    break;
                case "infos":
                    infosCmd.push(`\`${cmd.info.name}\``);
                    break;
                case "moderation":
                    moderationCmd.push(`\`${cmd.info.name}\``);
                    break;
                case "backup":
                    backupCmds.push(`\`${cmd.info.name}\``);
                    break;
                case "general":
                    generalCmds.push(`\`${cmd.info.name}\``);
                    break;
                case "owner":
                    ownerCmds.push(`\`${cmd.info.name}\``);
                    break;
            }
        })

        const collector = reactMsg.createReactionCollector((r, u) => u.id === msg.author.id);

        collector.on("collect", (reaction) => {
            switch(reaction.emoji.name){
                case "📥":
                    reactMsg.delete();
                    sendHere();
                    break;
                case "🔒":
                    reactMsg.delete();
                    sendDM();
                    break;
            }
        })

        var finalEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setAuthor("Help Menu", client.user.avatarURL())
            .addField(`Config Commands`, configCmds.join(", "))
            .addField(`Infos Commands`, infosCmd.join(", "))
            .addField(`Moderation Commands`, moderationCmd.join(", "))
            .addField(`Backup Commands`, backupCmds.join(", "))
            .addField(`General Commands`, generalCmds.join(", "))
            .addField("Owner Commands", ownerCmds.join(", "))

        function sendDM(){
            msg.channel.send(`Menu sent :white_check_mark:`).then((sent) => sent.delete({timeout : 3000}))
            msg.author.send(finalEmbed);
        }

        function sendHere(){
            msg.channel.send(finalEmbed);
        }
    }
}

exports.info = {
    name : "help",
    alias : ["commands", "commandes", "command", "commande"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Show a menu with bot's commands",
        usage : "[prefix]help [command]",
        ex : "[prefix]help autorole"
    }
}