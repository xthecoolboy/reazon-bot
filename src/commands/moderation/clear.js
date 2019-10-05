const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.channel.send(`This command require MANAGE_MESSAGES !`);

    var nbre = args[1];

    if(!nbre) return msg.channel.send(`🗑⚠️ You have to tell the number of message to purge`, {code : true});
    if(isNaN(nbre)) return msg.channel.send(`🗑⚠️ Parameter number is not a number !`, {code : true});
    if(nbre > 100) return msg.channel.Send(`🗑⚠️ I can't delete more than 100 messages`, {code : true});

    msg.channel.bulkDelete(nbre, true).then((deleted) => {
        msg.channel.send(`🗑✅ I have deleted ${deleted.size} messages`, {code: true}).then((s) => {
            s.delete({timeout : 3000});
        });
    });
}

exports.info = {
    name : "clear",
    alias : ["purge"],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Purge x messages of the channel",
        usage : "[prefix]clear <number>",
        ex : "[prefix]clear 5"
    }
}