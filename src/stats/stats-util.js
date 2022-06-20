import axios from 'axios'
import UserStats from './user-stats.js'

const SKEY = process.env.STEAM_KEY;
const SAPI = axios.create({baseURL: 'http://api.steampowered.com'})
const SIDPattern = new RegExp(/7656[0-9]{13}/);
const SUPattern = new RegExp(/[A-Za-z0-9_]{3,32}/);


async function performGet(endpoint){
    let resp;
    try{
	resp = await SAPI.get(endpoint);
    }catch (err){
	//console.log(err);
    }
    return resp;
}

async function getSteamId(user){

    if(SIDPattern.test(user)){
	//they passed a steamid don't make the request.
	return user;
    }

    if (!SUPattern.test(user)){
	//neither a correct steamid or steamuser, don't make the request.
	return null;
    }

    const resp = await performGet(`/ISteamUser/ResolveVanityURL/v0001/?key=${SKEY}&vanityurl=${user}`)
    const {status, data} = resp || {};

    if(status !== 200){
	return null;
    }
    
    return data.response.steamid ?? null;
}

async function getStats(user){  
    const stid = await getSteamId(user);

    if(!stid){
	return null;
    }

    const resp = await performGet(`/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${SKEY}&steamid=${stid}`)   
    const {status, data} = resp || {};
    
    if(status !== 200){
	return null;
    }
    //steam weird ass json response....
    const stats = data.playerstats.stats.reduce((a,x) => ({...a, [x.name]: x.value}), {});  
    return new UserStats(stats);
}


export default getStats
