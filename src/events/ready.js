const DsEvent = require("../constructors/DsEvent");

class ReadyEvent extends DsEvent{
    constructor(){
        super('ready');
    }

    async run(client){
        console.log('BOT has started!')
    }
}

module.exports = ReadyEvent;