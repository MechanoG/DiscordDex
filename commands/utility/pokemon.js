const {Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {pokemondata, getDexEntries,embedReturn, statsReturn} = require('../../pokemondata')


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
        const data = await pokemondata(poke); 
        const dexData = await getDexEntries(data.species.url);
        const types = data.types;
        const version = dexData[0][0];
        const pokedata = dexData[0][1];
        const stats = statsReturn(data.stats);
        

        let embededReply = embedReturn(data.name, data.sprites.front_default, pokedata, types,stats);
        interaction.channel.send(embededReply);
        
        //await interaction.reply(`${version} data:\n` + `${pokedata}`); 
        

    }
}