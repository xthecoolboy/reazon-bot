const Discord = require("discord.js"),
backup = require("../../functions/backup");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission !", {code : true});

    var ID = args[1];

    if(!ID) return msg.channel.send("Parameter ID is not valid !", {code : true});

    backup.delete(ID).then(() => {
        return msg.channel.send(`backup successfully deleted !`, {code : true});
    }).catch(() => {
        return msg.channel.send(`This backup doesn't exist !`, {code : true});
    });
}

exports.info = {
    name : "del-backup",
    perm : null,
    alias : [],
    dir : __dirname,
    help : {
        desc : "Delete a backup",
        usage : "[prefix]del-backup <ID>",
        ex : "[prefix]del-backup 0HJHC"
    }
}