const Discord = require("discord.js");

exports.run = async (client, msg, args) => {

    var weather = require('weather-js');
     
    weather.find({search: args[1], degreeType: 'C'}, function(err, result) { 
        if (err) msg.channel.send('Plz use weather <city> ');
    
       
        if (result.length === 0) {
            msg.channel.send('**I find `0` result for seatch' + args[1] + " use - if city content space**") // This tells them in chat that the place they entered is invalid.
            return;
        }
    
      
        
        var current = result[0].current; 
       
        var location = result[0].location; 
       
    
       
        const embed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`) 
            .setAuthor(`Weather at ${location.name}`) 
            .setThumbnail(current.imageUrl) 
            .setColor("RANDOM") 
            .addField('Observed at',`${current.observationtime}`, true) 
            .addField('Date of target',`${current.date}`, true) 
            
            .addField('Temperature',`${current.temperature} °C`, true)
            .addField(`Feels like` , `${current.feelslike} °C`, true)
            .addField('Wind speed',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
    
            
            msg.channel.send(embed);
    });
}

exports.info = {
     name : "weather",
    alias : ["meteo", "wt"],
    perms : [],
    dir : __dirname,
    help : {
        desc : "see weather",
        usage : "[prefix]weather (city)",
        ex : "[prefix]weather Paris"  
    }
}