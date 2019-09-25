
//! DEPENDENCIES
const Discord = require("discord.js"),
client = new Discord.Client(),

Enmap = require("enmap"),
db = new Enmap({name : "db"}),

fs = require("fs"),

chalk = require("chalk"),

moment = require("moment"),

config = require("../config");
client.config = config;

//! LOAD COMMANDS
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

//! LOGIN
client.login(config.token);

client.on("ready", () => {

    console.clear();
    loadCommands();
    loadDb(db);

    wait(1500).then(() => {
        console.clear();
        console.log(chalk.red(ascii + "\n"));
        console.log(chalk.green(`Connected to Discord API`));
        console.log("------------------------------------------------");
        console.log(chalk.blue(`-> Discord Bot By Jocke and Kaly`));
        console.log(chalk.magenta(`-> Bot Name :   [ ${client.user.username} ]`));
        console.log(chalk.magenta(`-> Bot Prefix : [ ${config.prefix} ]`));
        console.log(chalk.magenta(`-> Bot Stats :  [ ${client.guilds.size} guild(s) ]`));
        console.log("------------------------------------------------");
        console.log(chalk.green(`=> Client ready`));

        var i = 0;

        setInterval(() => { 

            let toDisplay = config.presence[parseInt(i, 10)]
            client.user.setActivity(toDisplay.name, {type: toDisplay.type,url : "https://twitch.tv/REAZON BOT"});
            if(config.presence[parseInt(i+1, 10)]) i++
            else i = 0;
            
        }, 5000);
    })
})

//! EVENTS

client.on("message", async(msg) => {

    if(
        msg.author.bot ||
        !msg.content.startsWith(config.prefix) ||
        !msg.guild
    ) return;

    var args = msg.content.substring(config.prefix.length).split(" ");
    var cmdName = args[0];

    client.commands.forEach((command) => {
        if(command.info.name === cmdName || command.info.alias.includes(cmdName)){
            if(command.info.perm === "owner" && msg.author.id !== config.ownerID){
                return
            }else{
                command.run(client, msg, args);
            }
        }
    });
});

//! ENMAP

function loadDb(name){
    name.defer.then(() => {
        console.log(`Database loaded : ${name.name}`)
    })
}

db.changed(() => {
    loadDb(db);
})

//! ERRORS
process.on("unhandledRejection", (err) => {
    
    var today = moment().format("L").split("/").join(":")
    var toWrite = `${moment().format("L")} :: ${moment().format("LT")} -> ${err}\n`

    if(!fs.existsSync(`${__dirname}/../Errors`)){
        fs.mkdirSync(`${__dirname}/../Errors`);
    }

    fs.appendFileSync(`${__dirname}/../Errors/${today}.log`, toWrite);
    console.log(`${moment().format("LT")} | New Error | Content --> /Errors/${today}.log`);
});

//! OTHERS
const wait = require("util").promisify(setTimeout);

const ascii = `
██████╗ ███████╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
██████╔╝█████╗  ███████║  ███╔╝ ██║   ██║██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
██║  ██║███████╗██║  ██║███████╗╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                             
  █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗   
  ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝
`