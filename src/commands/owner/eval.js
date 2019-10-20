const Discord = require("discord.js");

exports.run = (client, msg, args) => {

    try{
        let codein = args.slice(1).join(" ");
        let code = eval(codein)

        if (typeof code != 'string')
        code = require('util').inspect(code);
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setAuthor('Eval Command', client.user.avatarURL)
            .addField('📥 Input', `\`\`\`js\n${codein}\`\`\``)
            .addField('📤 Output', `\`\`\`js\n${code}\n\`\`\``)
        msg.channel.send(embed)

    } catch(e) {
        msg.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}  
exports.info = {
    name : "eval",
    perms : [],
    alias : [],
    dir : __dirname,
    help : {
        desc : "Test a block of code",
        usage : "[prefix]eval <code>",
        ex : "[prefix]eval msg.channel.name"
    }
}