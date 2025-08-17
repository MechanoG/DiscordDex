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

function embedReturn(name, spriteUrl, dexData){
    const pokeEmbed = new EmbedBuilder()
        .setTitle(`${name}`)
        .setImage(`${spriteUrl}`);

    console.log(`${dexData}`)

   

    return {embeds: [pokeEmbed]};
    
}


module.exports = {pokemondata, getDexEntries, embedReturn};



    