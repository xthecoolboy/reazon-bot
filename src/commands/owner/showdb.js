const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete()

    var db = JSON.stringify(client.db.get(msg.guild.id))

    msg.channel.send(db, {code : true});
}

exports.info = {
    name : "showdb",
    alias : [],
    perms : [],
    dir : __dirname,
    help : {
        desc : "Show db keys value for this guild",
        usage : ["[prefix]showdb"],
        ex : "/"
    }
}