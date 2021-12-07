const fs = require('fs');
const path = require('path');
const DsEvent = require('./DsEvent');
const DsCommand = require('./DsCommand');



async function regCommands(client){
    const fPath = path.join(__dirname, '../commands');
    const cmdFiles = await fs.promises.readdir(fPath);

    for(const file of cmdFiles){
        if(!file.endsWith('.js')) continue;
        const dsCmd = require(path.join(fPath, file));

        if(dsCmd.prototype instanceof DsCommand){
            const cmd = new dsCmd();
            client.commands.set(cmd.name, cmd);
        }
    }
}

async function regEvents(client){

    const fPath = path.join(__dirname, '../events');
    const eventFiles = await fs.promises.readdir(fPath);

    for(const file of eventFiles){
        if(!file.endsWith('.js')) continue;
        const dsEvent = require(path.join(fPath, file));
        //get the file as it is.
        if(dsEvent.prototype instanceof DsEvent){
            const event = new dsEvent();
            //create a new instance of the event.
            client.events.set(event.name, event);
            client.on(event.name, event.run.bind(event, client));
        }
    }
}

module.exports = {
    regCommands,
    regEvents,
}