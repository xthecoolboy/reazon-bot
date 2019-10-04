const Discord = require("discord.js");

exports.run = async(client, msg, args) => {

    msg.delete();

    if(!client.db.get(msg.guild.id, "ticket")) return msg.channel.send("This system is not enabled on this server !", {code : true});

    var role = client.db.get(msg.guild.id, "ticket.role");
    if(!role) return dropError("support role configuration");
    var category = client.db.get(msg.guild.id, "ticket.category");
    if(!category) return dropError("category configuration");
    var msgContent = client.db.get(msg.guild.id, "ticket.msgContent");
    if(!msgContent) return dropError("msgContent configuration");

    role = msg.guild.roles.get(role);
    if(!role) return dropError("cannot find the support role !");
    category = msg.guild.channels.find((c) => c.type === "category" && c.id === category);
    if(!role) return dropError("cannot find the ticket category !");

    function dropError(reason){
        var errorEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle("Ticket Configuration Error !")
            .setDescription(`Ticket System configuration is not valid ! \n**Not valid parameter : ${reason}**`)
        msg.channel.send(errorEmbed);
    }

    var openOrClose = args[1];

    if(!openOrClose) return msg.channel.send("You have to tell if you want to close or open a ticket ! (Support can also add someone to the the ticket with \"add\")", {code : true});

    switch(openOrClose){

        case "create":
        case "open":
            if(msg.guild.channels.array().find((e) => e.name.startsWith(`ticket-${msg.author.discriminator}`))){
                return msg.channel.send(`You have already opened a ticket !`, {code : true});
            }else{
                msg.guild.channels.create(`ticket-${msg.author.discriminator}`, {
                    type : "text",
                    parent : category,
                    permissionOverwrites : [
                        {
                            id : msg.guild.id,
                            deny : ["VIEW_CHANNEL"]
                        },
                        {
                            id : msg.author.id,
                            allow : ["VIEW_CHANNEL"]
                        },
                        {
                            id : role.id,
                            allow : ["VIEW_CHANNEL"]
                        }
                    ]
                }).then((channel) => {
                    var embed = new Discord.MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setDescription(`Your ticket was created ! ${channel}`)
                    msg.channel.send(embed)

                    msgContent = msgContent.split("{user}").join(msg.author).split("{support}").join(role).split("{name}").join(msg.author.username);
                    var channelEmbed = new Discord.MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setTitle(`Ticket System`)
                        .setDescription(msgContent)
                    channel.send(channelEmbed);
                })
            }
            break;
        
        case "close":
            if(msg.channel.name.startsWith("ticket-")){
                return msg.channel.delete();
            }else{
                msg.channel.send(`You can't delete this channel !`, {code : true});
            }
            break;
        
        case "add":
            if(msg.member.roles.has(role.id)){

                var mention = msg.mentions.members.first();
                if(!mention){
                    if(!isNaN(args[2])){
                        mention = msg.guild.members.get(args[2])
                        if(!mention) return msg.channel.send("I can't find this user !", {code : true});
                    }else{
                        return msg.channel.send("You have to mention or give the id of someone !", {code : true})
                    }
                }

                msg.channel.updateOverwrite(mention, {
                    VIEW_CHANNEL : true
                })

                var embed = new Discord.MessageEmbed()
                    .setColor(client.config.embed.color)
                    .setDescription(`${mention} has been added to the ticket channel !`);
                msg.channel.send(embed);
            }else{
                return msg.channel.send("This command is only for support !", {code : true})
            }
            break;
    }
}

exports.info = {
    name : "ticket",
    alias : [],
    perm : null,
    dir : __dirname,
    help : {
        desc : "Open a ticket, if system enabled\n\nIf the command is ticket add you must mention or give the id of someone",
        usage : "[prefix]ticket <open | close | add >",
        ex : "[prefix]ticket open\nticket close (only in ticket channel)\nticket add @mention or ID"
    }
}