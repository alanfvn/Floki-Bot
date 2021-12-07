const DsCommand = require('../constructors/DsCommand');
const {MessageEmbed} = require('discord.js');
const {getStats} = require('../stats/stats-util');

class StatsCmd extends DsCommand{

    constructor(){
        super('stats');
    }
    
    async run(client, message, args){

        if(args.length !== 1){
            channel.send('```Usage: !stats <steamid/username>```');
            return;
        }
        
        const channel = message.channel;
        const data = await getStats(args[0]);

        if(data === null){
            channel.send('```User not found!```')
            return;
        }

        const embed = new MessageEmbed()
            //.setColor('#0099ff')
            .setTitle(`CS:GO Stats for \"${args[0]}\"`)
            .setTimestamp()
            .addFields(
                { name: 'Kills:', value: `${data.stats.total_kills}`, inline: true},
                { name: 'K/D:', value: `${data.kd}`, inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: 'Accuracy:', value : `${data.accuracy}%`, inline: true},
                { name: 'Headshots:', value: `${data.hs_percentage}%`, inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: 'MVPs:', value: `${data.stats.total_mvps}`, inline: true},
                { name: 'Time played:', value: `${data.time_played} hour(s)`, inline: true},
            );
        channel.send({embeds: [embed]});
    }

}



module.exports = StatsCmd;