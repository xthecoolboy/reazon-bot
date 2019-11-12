
//! DEPENDENCIES
const Discord = require("discord.js"),
client = new Discord.Client(),

Enmap = require("enmap"),
db = new Enmap({name : "db"}),

fs = require("fs"),

chalk = require("chalk"),

moment = require("moment"),

path = require("path"),

config = require("../config");
client.config = config;
client.db = db;

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

//! LOAD EVENTS
function loadEvents(){
    fs.readdir(`${__dirname}/events/`, (err, files) => {
        if (err) return console.error(err);
        
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            delete require.cache[require.resolve(`${__dirname}/events/${file}`)];
            const event = require(`${__dirname}/events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            console.log(`Loaded event : ${eventName}`);
        });
    });
}

//! LOGIN
client.login(config.token);

client.on("ready", () => {

    console.clear();
    // Load commands in the cache
    loadCommands(); 
    // Load database in the cache
    loadDb(db);
    // Load events
    loadEvents();

    wait(1500).then(() => {
        console.clear();
        console.log(chalk.red(ascii + "\n"));
        console.log(chalk.green(`Connected to Discord API`));
        console.log("------------------------------------------------");
        console.log(chalk.blue(`-> Discord Bot By Jocke and Kaly`));
        console.log(chalk.magenta(`-> Bot Name :   [ ${client.user.username} ]`));
        console.log(chalk.magenta(`-> Bot Prefix : [ ${config.prefix} ]`));
        console.log(chalk.magenta(`-> Bot Stats :  [ ${client.guilds.size} guild(s) ]`));
        console.log(chalk.magenta(`-> Cmds Size :  [ ${client.commands.length} ]`));
        console.log("------------------------------------------------");
        console.log(chalk.green(`=> Client ready`));

        const backup = require("easy-save-discord");
        backup.setStorageFolder(`${__dirname}/../backups/`);

        client.guilds.forEach((guild) => {
            if(!db.has(guild.id)){
                addPrefix(guild.id)
            }
        });

        require("./utils/checkAutoBackup").init(client);

        // Activity System
        var i = 0;
        setInterval(() => { 

            let toDisplay = config.presence[parseInt(i, 10)]
            client.user.setActivity(toDisplay.name, {type: toDisplay.type,url : "https://twitch.tv/REAZON BOT"});
            if(config.presence[parseInt(i+1, 10)]) i++
            else i = 0;
            
        }, 5000);
    })
})

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

    console.error(err);

    /*var today = moment().format("L").split("/").join(":")
    var toWrite = `${moment().format("L")} :: ${moment().format("LT")} -> ${err}\n`

    if(!fs.existsSync(`${__dirname}${path.sep}..${path.sep}Errors`)){
        fs.mkdirSync(`${__dirname}${path.sep}..${path.sep}Errors`);
    }

    fs.appendFileSync(`${__dirname}${path.sep}..${path.sep}Errors${path.sep}${today}.log`, toWrite);
    console.log(`${moment().format("LT")} | New Error | Content --> /Errors/${today}.log`);*/
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

function addPrefix(id){
    db.set(id, config.prefix, "prefix");
}