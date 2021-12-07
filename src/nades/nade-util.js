const fs = require('fs');
const path = require('path');

let nades = null;


async function loadNades(){
    const fPath = path.join(__dirname, '../nades.json');
    const data = await fs.promises.readFile(fPath);
    nades = await JSON.parse(data);
}

function getNades(type){
    return nades[type];
}

module.exports = {
    loadNades,
    getNades,
}