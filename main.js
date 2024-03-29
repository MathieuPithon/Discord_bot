const { strikethrough } = require('@discordjs/builders');
const fs = require('fs');
const { Client, Collection, Intents, CommandInteraction } = require('discord.js');
const { token } = require('./config.json');


// Create a new client instance
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES);

const client = new Client({ intents: myIntents });


// récupération des fichiers js des évènements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}


// Recupération des fichiers js des commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
// Login to Discord with your client's token
client.login(token);

