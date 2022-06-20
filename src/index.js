import 'dotenv/config.js'
import {Client, Intents} from 'discord.js'
import registerLogic from './constructors/ds-man.js';
import {loadNades} from './nades/nade-util.js';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});


async function initBot(){
    client.prefix = "!";
    client.commands = new Map();
    client.events = new Map();

    await loadNades();
    await registerLogic(client);
    await client.login(process.env.BOT_TOKEN);
}

initBot();
