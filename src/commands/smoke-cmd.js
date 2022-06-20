import DsCommand from '../constructors/ds-command.js';
import DsArg from '../constructors/ds-args.js';
import { getNades } from '../nades/nade-util.js';
import { Constants } from 'discord.js';


class SmokeCmd extends DsCommand{

    constructor(){
        super('smoke', 'see the list of smokes.', [
	    new DsArg('map', 'the name of the map', true, 
		Constants.ApplicationCommandOptionTypes.STRING),
	    new DsArg('name', 'the name of the reference', true, 
		Constants.ApplicationCommandOptionTypes.STRING)
	]);
    }
    
    async run(interaction){

	const { options } = interaction; 

	const mapList = getNades('smokes');
	const nadeList = mapList[options.getString('map')] ?? {};
	const nade = nadeList[options.getString('name')];
	let reply = "";

	if(Object.keys(nadeList).length === 0){
	    reply = `Map not found, Available maps: \`${Object.keys(mapList)}\``
	}else if(!nade){    
	    reply = `Nade not found, Available nades: \`${Object.keys(nadeList)}\``;
	}else{
	    reply = nade;
	}

	interaction.reply({content: reply});
    }
}

export default SmokeCmd;
