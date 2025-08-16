const {SlashCommandBuilder} = require('discord.js')
const {pokemondata, getDexEntries} = require('../../pokemondata')


module.exports={
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Reply whit data about the pokemons')
        .addStringOption(option=>
            option.setName('pokemon')
            .setDescription('pokemon to recover data from')
            .setRequired(true)),

    async execute(interaction){
        const poke = interaction.options.get('pokemon').value;
        data = await pokemondata(poke);
        console.log(data);
        getDexEntries(data.species.url); 
    }
}