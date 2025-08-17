const {Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {pokemondata, getDexEntries,embedReturn} = require('../../pokemondata')


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
        console.log(interaction.channel);

        


        let dexData = await getDexEntries(data.species.url);

        let embededReply = embedReturn(data.name, data.sprites.front_default, dexData[0][1]);

        interaction.channel.send(embededReply);

        const version = dexData[0][0];
        const pokedata = dexData[0][1];
        //await interaction.reply(`${version} data:\n` + `${pokedata}`); 
        

    }
}