const {EmbedBuilder,Client,GatewayIntentBits} = require('discord.js');

const pokeurl = 'https://pokeapi.co/api/v2/pokemon';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function pokemondata(pokename){
    
    const pokemonurl = pokeurl + '/' + pokename;
    console.log(pokemonurl)

    try{
        const data = await fetch(pokemonurl);
        const pokedata = await data.json();

        return pokedata;

        console.log(pokedata.species.url);
    }catch(error){
        console.log(error);
    }   
}

async function getDexEntries(url){

    let returnDex = [];

    try{
        const dex = await fetch(url)
        const species = await dex.json();
        const dexEntries = species.flavor_text_entries;
        for (let entry of dexEntries){

            if (entry.language.name === "es"){
                
                let entryData = [ entry.version.name, entry.flavor_text]; 

                returnDex.push(entryData);   
            }
        }

        return returnDex;

    }catch(error){
        console.log(error);
    }
    
}

async function getDexNum(url){
   
    try{
        const dex = await fetch(url)
        const species = await dex.json();
        const dexnum = species.pokedex_numbers[0].entry_number;
        

        return dexnum;

    }catch(error){
        console.log(error);
    }
    
}

function statsReturn(stats){
    let finalStats = [];

    for (let element of stats){
        const statName = element.stat.name;
        const statValue = element.base_stat;
        finalStats.push([statName, statValue]);
    }

    console.log(finalStats);
    return finalStats;

}

function typeAsing(types){

    if (types.length>1) return `${types[0].type.name} | ${types[1].type.name}`
    return `${types[0].type.name}`  
}

function embedReturn(name, spriteUrl, dexData, types, stats, dexNum, altura, peso){

    const pokeEmbed = new EmbedBuilder()
        .setTitle('NATIONAL POKEDEX:')
        .setImage(`${spriteUrl}`)
        .addFields(
            {name: `No ${dexNum}  ${name}`, value: ""},
            {name: `HEIGHT: ${altura/10} m`, value:""},
            {name: `WEIGHT: ${peso/10} kg`, value:""},
            {name: `TYPES: ${typeAsing(types)}`, value:""},
            {name: `${dexData}`, value: ""},
            {name: `Estadisticas`, value: `${stats[0][0]} : ${stats[0][1]}
                                    ${stats[1][0]} : ${stats[1][1]} 
                                    ${stats[2][0]} : ${stats[2][1]}
                                    ${stats[3][0]} : ${stats[3][1]}
                                    ${stats[4][0]} : ${stats[4][1]}
                                    ${stats[5][0]} : ${stats[5][1]}
                                    ${`Total Stats :` + String(stats[0][1] +
                                                               stats[1][1] +
                                                               stats[2][1] +
                                                               stats[3][1] +
                                                               stats[4][1] +
                                                               stats[5][1])}`},
        ); 
    
    return {embeds: [pokeEmbed]};
    
}
module.exports = {pokemondata, getDexEntries, embedReturn, statsReturn, getDexNum};



    