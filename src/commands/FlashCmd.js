const DsCommand = require("../constructors/DsCommand");


class FlashCmd extends DsCommand{

    constructor(){
        super('flash');
    }
    
    async run(client, message, args){
        const channel = message.channel;
        channel.send(`Not implemented yet...`);
    }
}


module.exports = FlashCmd;