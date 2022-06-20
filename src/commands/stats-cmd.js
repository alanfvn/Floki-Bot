import DsCommand from '../constructors/ds-command.js';
import DsArg from '../constructors/ds-args.js';
import getStats from '../stats/stats-util.js';
import { MessageEmbed, Constants } from 'discord.js';



class StatsCmd extends DsCommand{

    constructor(){
        super('stats', 'check the cs:go stats for any user.', [
	    new DsArg("user", "steamid or steam username", true, 
		Constants.ApplicationCommandOptionTypes.STRING)
	]);
    }
    
    async run(interaction){

	const {options} = interaction;
	const userName = options.getString("user");
	const data = await getStats(userName);
	
	if(data === null){
	    interaction.reply({content: `User \`${userName}\` not found`});
	    return;
	}

	const embed = new MessageEmbed()
	    .setTitle(`CS:GO Stats for \"${userName}\"`)
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
	interaction.reply({embeds: [embed]});	
    }
}


export default StatsCmd
