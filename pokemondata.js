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

        const statValue = element.base_stat;
        const statName = element.stat.name;
        switch(statName){
            
            case 'hp':
                finalStats.push(['Hp', statValue]);        
                break;
            case 'attack':
                finalStats.push(['Ataque', statValue]);        
                break;
            case 'defense':
                finalStats.push(['Defensa', statValue]);        
                break;
            case 'special-attack':
                finalStats.push(['Ataque especial', statValue]);        
                break;
            case 'special-defense':
                finalStats.push(['Defensa especial', statValue]);        
                break;
            case 'speed':
                finalStats.push(['Velocidad', statValue]);        
                break;
            default:
                finalStats.push([statName, statValue]);
        }
    }

    console.log(finalStats);
    return finalStats;

}

function typeAsing(types){

    if (types.length>1)    
        
        return `${parseType(types[0].type.name)}` + ' | ' + `${parseType(types[1].type.name)}`
    return `${parseType(types[0].type.name)}`  
}

function parseType(type){
    switch(type){
        case "normal" :
            return "Normal";
            break;
        case "fighting" :
            return "Lucha";
            break;
        case "flying" :
            return "Volador";
            break;
        case "poison" :
            return "Veneno";
            break;
        case "ground" :
            return "Tierra";
            break;
        case "rock" :
            return "Roca";
            break;
        case "bug" :
            return "Bicho";
            break;
        case "ghost" :
            return "Fantasma";
            break;
        case "steel" :
            return "Acero";
            break;
        case "fire" :
            return "Fuego";
            break;
        case "water" :
            return "Agua";
            break;
        case "grass" :
            return "Planta";
            break;
        case "electric" :
            return "Electrico";
            break;
        case "psychic" :
            return "Psiquico";
            break;
        case "ice" :
            return "Hielo";
            break;
        case "dragon" :
            return "Dragon";
            break;
        case "dark" :
            return "Siniestro";
            break;
        case "fairy" :
            return "Hada";
            break;
        case "stellar" :
            return "Astral";
            break;
        case "unknown" :
            return "???";
            break;
        default:
            return type;
    }

}

function embedReturn(name, spriteUrl, dexData, types, stats, dexNum, altura, peso){

    const pokeEmbed = new EmbedBuilder()
        .setTitle('POKEDEX NACIONAL:')
        .setImage(`${spriteUrl}`)
        .addFields(
            {name: `No ${dexNum}  ${name.slice(0,1).toUpperCase()}${name.slice(1)} `, value: ""},
            {name: `ALTURA: ${altura/10} m`, value:""},
            {name: `PESO: ${peso/10} kg`, value:""},
            {name: `TIPOS: ${typeAsing(types)}`, value:""},
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



    