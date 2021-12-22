const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('salut')
		.setDescription("pour dire bonjour!"),
	async execute(interaction) {
        return interaction.reply('Salut à tous les amis');
    },
};