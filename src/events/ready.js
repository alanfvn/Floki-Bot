import DsEvent from '../constructors/ds-event.js';

class ReadyEvent extends DsEvent{

    constructor(){
        super('ready');
    }

    async run(client){
	const guild = null//client.guilds.cache.get('538536222549606401');
	const cmds = guild ? guild.commands : client.application?.commands;

	if(!cmds){
	    return;
	}

	for(const [,cmd] of client.commands.entries()){

	    const {name, description, args} = cmd;
	    const options = args?.map(function(arg){
		return {
		    name: arg.name,
		    description: arg.description,
		    required: arg.required,
		    type: arg.type
		}
	    })
	    
	    const command = await cmds.create({
		name,
		description,
		options
	    }); 
	    console.log(`Registered command ${name}, with id: ${command.id}`);
	}
	
	console.log('BOT has started!');
    }
}

export default ReadyEvent
