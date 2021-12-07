const DsCommand = require('../constructors/DsCommand');
const {getNades} = require('../nades/nade-util');

class SmokeCmd extends DsCommand{

    constructor(){
        super('smoke');
    }
    
    async run(client, message, args){

        const channel = message.channel;

        if(args.length < 1){
            channel.send('```Usage: !smoke <map> <name>```');
            return;
        }

        const mapList = getNades('smokes');
        const nadeList = mapList[args[0]];

        if(!nadeList){
            channel.send("```Map not found!\n\n"+
            "Available maps: "+Object.keys(mapList)+"```")
            return;
        }

        const nade = nadeList[args[1]];

        if(!nade){
            channel.send("```Smoke not found!\n\n"
            +"Available smokes: "+Object.keys(nadeList)+" ```")
            return;
        }

        channel.send(nade);
    }

}



module.exports = SmokeCmd;