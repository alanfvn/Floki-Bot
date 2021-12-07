const DsCommand = require("../constructors/DsCommand");


class MollyCmd extends DsCommand{

    constructor(){
        super('molly');
    }
    
    async run(client, message, args){

        const channel = message.channel;

        channel.send(`Not implemented yet...`);
    }

}

module.exports = MollyCmd;