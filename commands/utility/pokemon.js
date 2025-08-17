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
        //console.log(data);
        let dexData = await getDexEntries(data.species.url);

        const version = dexData[0][0];
        const pokedata = dexData[0][1];
        await interaction.reply(`${version} data:\n` + `${pokedata}`);        

    }
}