const {SlashCommandBuilder} = require(`discord.js`);

module.exports = {
    data : new SlashCommandBuilder()
        .setName('periquito')
        .setDescription('Repeats a input string from the user')
        .addStringOption(option =>
            option.setName('repeat')
                .setDescription('Message to repeat')
                ),
        
    async execute(interaction){
        
        const repeat = interaction.options.get('repeat').value;
        console.log(repeat);
        await interaction.reply(`Repitiendo: ${repeat}`);
    }
}



    