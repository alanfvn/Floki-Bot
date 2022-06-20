import fs from 'fs';
import path from 'path'
import DsEvent from './ds-event.js';
import DsCommand from './ds-command.js';
import {fileURLToPath, pathToFileURL} from 'url'


function getDir(dirName){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fPath = path.join(__dirname, dirName);
    return fPath;
}

async function registerLogic(client){
    
    //register commands.
    const cmdPath = getDir('../commands');
    const cmdFiles = await fs.promises.readdir(cmdPath);

    for(const file of cmdFiles){
	const dsCmd = (await import(pathToFileURL(path.join(cmdPath, file)))).default
	if(dsCmd.prototype instanceof DsCommand){
            const cmd = new dsCmd();
            client.commands.set(cmd.name, cmd);
        }
    }

    //register events. 
    const eventPath = getDir('../events');
    const eventFiles = await fs.promises.readdir(eventPath);

    for(const file of eventFiles){
	const dsEvent = (await import(pathToFileURL(path.join(eventPath, file)))).default

	if(dsEvent.prototype instanceof DsEvent){
            const discordEv = new dsEvent();
            client.events.set(discordEv.name, discordEv);
            client.on(discordEv.name, discordEv.run.bind(discordEv, client));
        }
    }
}

export default registerLogic; 
