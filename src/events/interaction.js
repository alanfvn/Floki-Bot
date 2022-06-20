import DsEvent from "../constructors/ds-event.js";


class InteractionCreate extends DsEvent{

    constructor(){
        super('interactionCreate');
    }

    async run(client, interaction){
	if(!interaction.isCommand()){
	    return
	}

	const {commandName} = interaction;
	const cmd = client.commands.get(commandName);

        if(cmd){
            cmd.run(interaction);
        }
    }
}

export default InteractionCreate;
