const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    var whereEmbed = new Discord.RichEmbed()
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

    var finalEmbed = new Discord.RichEmbed()
        .setColor(client.config.embed.color)
        .setAuthor("Help Menu", client.user.avatarURL)
        .addField(`Config Commands`, configCmds.join(", "))
        .addField(`Infos Commands`, infosCmd.join(", "))
        .addField(`Moderation Commands`, moderationCmd.join(", "))

    function sendDM(){
        msg.channel.send(`Menu sent :white_check_mark:`).then((sent) => sent.delete(3000))
        msg.author.send(finalEmbed);
    }

    function sendHere(){
        msg.channel.send(finalEmbed);
    }
}

exports.info = {
    name : "help",
    alias : ["commands", "commandes", "command", "commande"],
    perm : null,
    dir : __dirname
}