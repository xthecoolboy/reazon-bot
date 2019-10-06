module.exports = (client, guild) => {

    const config = client.config
    
    const db = client.db;

    if(!db.has(guild.id)){
        db.set(guild.id, config.prefix, "prefix");
    }

}
