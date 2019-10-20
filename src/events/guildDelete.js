module.exports = (client, guild) => {
    
    const db = client.db;
    db.delete(guild.id);
}