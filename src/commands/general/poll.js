const Discord = require("discord.js") 
moment = require("moment")

exports.run = async (client, msg, args) => {

    var poll_content = args.slice(1).join(" ")

    if(!poll_content) {
        var error_content = new Discord.MessageEmbed()
            .setTitle("⚠️ Error !")
            .setDescription("Please enter à topic|message for start the poll !")
            .setColor(client.config.embed.color)
        msg.channel.send(error_content)
    }

    var embed = new Discord.MessageEmbed()
        .setColor("✅ Poll created !")
        .setDescription("**Content :**" + poll_content)
        .setColor(client.config.embed.color)
    msg.channel.send(embed);
    msg.react("👎🏻")
    msg.react("👍🏻")
}

exports.info = {
    name: "poll",
    alias: [],
    perms: ["MANAGE_MESSAGES"],
    dir: __dirname,
    help: {
        desc : "Create à poll with your content",
        usage : "[prefix]poll [content]",
        ex : "[prefix]poll you love pineapples ?"
    }
}
