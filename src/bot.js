require('dotenv').config();
const fs = require('fs');
const { Client, Collection, IntentsBitField, GatewayIntentBits } = require('discord.js');

const { TOKEN } = process.env;

const intents = new IntentsBitField();
[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.GuildMessageReactions
]
    .forEach(intent => {
        intents.add(intent);
    });

const client = new Client({ intents });

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles) {
        require(`../functions/${folder}/${file}`)(client);
    }
};

const init = async () => {
    client.handleEvents();
    client.handleCommands();

    client.login(TOKEN);
};

init();