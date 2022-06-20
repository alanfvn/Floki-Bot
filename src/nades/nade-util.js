import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';

let nades = null;


async function loadNades(){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fPath = path.join(__dirname, '../nades.json');

    const data = await fs.promises.readFile(fPath);
    nades = await JSON.parse(data);

}

function getNades(type){
    return nades[type];
}

export {loadNades, getNades}
