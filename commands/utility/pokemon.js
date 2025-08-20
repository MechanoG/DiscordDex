const {Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {pokemondata, getDexEntries,embedReturn, statsReturn,getDexNum} = require('../../pokemondata')


module.exports={
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Reply with data about the pokemons')
        .addStringOption(option=>
            option.setName('pokemon')
            .setDescription('pokemon to recover data from')
            .setRequired(true)),

    async execute(interaction){
        const poke = interaction.options.get('pokemon').value;
        const data = await pokemondata(poke); 
        const dexData = await getDexEntries(data.species.url);
        const pokeNum = await getDexNum(data.species.url);
        const types = data.types;
        const version = dexData[0][0];
        const pokedata = dexData[0][1];
        const stats = statsReturn(data.stats);
        

        let embededReply = embedReturn(data.name, data.sprites.front_default, pokedata, types, stats, pokeNum, data.height, data.weight);
        interaction.channel.send(embededReply);

    }
}