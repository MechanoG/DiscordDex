const pokeurl = 'https://pokeapi.co/api/v2/pokemon'

async function pokemondata(pokename){
    
    const pokemonurl = pokeurl + '/' + pokename;

    console.log(pokemonurl)

    try{
        const data = await fetch(pokemonurl);
        
        const pokedata = await data.json();


        console.log(pokedata.species.url);
    }catch(error){
        console.log(error);
    }
    
}

async function getDexEntries(){
    
}

module.exports = {pokemondata};



    