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

///Embed, nombre, imagen, 

function typeAsing(types){

    if (types.length>1) return `${types[0].type.name} | ${types[1].type.name}`
        
    return `${types[0].type.name}`  
    
    

}

function embedReturn(name, spriteUrl, dexData, types){
    const pokeEmbed = new EmbedBuilder()
        .setTitle(`${name} - ${typeAsing(types)}`)
        .setImage(`${spriteUrl}`)
        .addFields(
            {name: `DEXDATA`, value: dexData }
        ); 
    
    return {embeds: [pokeEmbed]};
    
}
module.exports = {pokemondata, getDexEntries, embedReturn};



    