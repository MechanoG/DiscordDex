const pokeurl = 'https://pokeapi.co/api/v2/pokemon'

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

    try{
        const dex = await fetch(url)
        const dexjson = await dex.json();
        console.log(dexjson.flavor_text_entries);
    }catch(error){
        console.log(error);
    }
    
}

module.exports = {pokemondata, getDexEntries};



    