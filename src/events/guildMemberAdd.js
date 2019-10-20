module.exports = (client, member) => {
    const db = client.db;

    if(db.has(member.guild.id)){
        if(db.has(member.guild.id, "autorole")){
            var role = member.guild.roles.get(db.get(member.guild.id).autorole)
            if(role){
                var compare = member.guild.me.roles.highest.comparePositionTo(role);
                if(compare > 0){
                    member.roles.add(role.id)
                }
            }
        }
        
        if(db.has(member.guild.id, "welcomemsg")){
            var msgContent = client.db.get(member.guild.id, "welcomemsg").msgContent
            if(!msgContent) return;

            var bvnchannel = db.get(member.guild.id, "welcomemsg").channel
            if(!bvnchannel) return;

            bvnchannel = member.guild.channels.get(db.get(member.guild.id, "welcomemsg").channel);
            if(!bvnchannel) return;

            if(msgContent) {
                const messagewelcome = msgContent
                 
                .replace(/{guild}/g, member.guild.name)
                .replace(/{user}/g, member)
                .replace(/{count}/g, member.guild.memberCount);
                bvnchannel.send(messagewelcome)
            }
        }
    }
}
