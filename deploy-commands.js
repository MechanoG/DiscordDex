/*
This script is intended to be run separately, only when you need 
to make changes to your slash command definitions - you're free 
to modify parts such as the execute function as much as you like 
without redeployment.
*/

const {REST, Routes} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
//Grabs all the commnd folders from the command directory createf
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
    //Grab all comands files from the comands directory you created
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    //Grab the SlashCommandBuilder#toJSON() outputh of each command's data for deployment
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if('data' in command && 'execute' in command){
            commands.push(command.data.toJSON());
        }else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }
}

//Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

//And deplay your commands

(async () => {
    try{
        console.log(`Stated refreshing ${commands.length} aplication (/) command.`);

        //The put methos is used to fully refres all comands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands},
        );

    }catch(error){
        //And of courese, make you catch and log any errors!
        console.error(error);
    }
})();