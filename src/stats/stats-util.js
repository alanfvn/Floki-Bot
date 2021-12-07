const axios = require("axios").default;
const UserStats = require('./UserStats');
const steam_key = process.env.steam_api_key;


async function getSteamId(user){

    const resp = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steam_key}&vanityurl=${user}`);
    let sid = null;

    if(resp.status === 200){
        const data = resp.data;
        sid  = data.response.steamid ?? null;
    }

    return sid;
}

async function getStats(user){

    const stid = await getSteamId(user);
    let resp = null;

    if(stid === null){
        return null;
    }

    try{
        resp = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${steam_key}&steamid=${stid}`);
    }catch(err){

    }

    if(resp?.status === 200){
        const data = resp.data.playerstats.stats
        const stats = data.reduce((a,x) => ({...a, [x.name]: x.value}), {});  //steam weird ass json response....
        return new UserStats(stats);
    }

    return null;
}

module.exports = {
    getStats,
}