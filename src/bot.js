
/* DEPENDENCIES */
const Discord = require("discord.js"),
client = new Discord.Client(),

Enmap = require("enmap"),
//enmap = new Enmap({name : "test"});

fs = require("fs"),

config = require("../config");

/* LOAD COMMANDS */
function loadCommands(){

    client.commands = [];

    fs.readdir(`${__dirname}/commands/`, (err, folders) => {
        if(err) console.log(err);

        folders.forEach((folder) => {
            fs.readdir(`${__dirname}/commands/${folder}`, (err, files) => {
                if(err) console.log(err);

                files.forEach((f) => {
                    delete require.cache[require.resolve(`${__dirname}/commands/${folder}/${f}`)];
                    var cmd = require(`${__dirname}/commands/${folder}/${f}`);
                    var cmdName = f.split(".")[0];
                    console.log(`Loaded commmand : ${cmdName}`);
                    client.commands.push(cmd);
                });
            });
        });
    });
}