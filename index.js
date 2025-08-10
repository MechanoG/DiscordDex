const {Client, Events, GatewayIntentBits} = require(`discord.js`);
const { token } = require(`./config.json`);

//New client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Log in to disconr whit your client tokenb
client.login(token);