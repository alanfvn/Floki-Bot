import DsEvent from "../constructors/ds-event.js";


class MessageEvent extends DsEvent{

    constructor(){
        super('messageCreate');
    }

    async run(client, message){
        //if(!message.content.startsWith(client.prefix) || message.author.bot) return;

        //const [cmdName, ...cmdArgs] = message.content
            //.slice(client.prefix.length)
            //.trim()
            //.split(/\s+/);

        //const command = client.commands.get(cmdName);

        //if(command){
            //command.run(client, message, cmdArgs);
        //}
    }
}

export default MessageEvent;
