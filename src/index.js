const {Client, Intents} = require('discord.js');
const {regCommands, regEvents} = require('./constructors/DsMan');
const {loadNades} = require('./nades/nade-util');

const bot_tk = process.env.bot_token;
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
    await regEvents(client);
    await regCommands(client);
    await client.login(bot_tk);
}

initBot();