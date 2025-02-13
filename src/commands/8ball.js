const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { logger } = require('../utils');

module.exports = {
    guild: null,
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8ball a question!')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask the magic 8ball')
                .setRequired(true)),

    /** @param {ChatInputCommandInteraction} interaction */
    async execute(interaction) {
        try {
            const responses = [
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes - definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Reply hazy, try again.',
                'Ask again later.',
                'Better not tell you now.',
                'Cannot predict now.',
                'Concentrate and ask again.',
                'Don\'t count on it.',
                'My reply is no.',
                'My sources say no.',
                'Outlook not so good.',
                'Very doubtful.'
            ];

            const question = interaction.options.getString('question');
            const response = responses[Math.floor(Math.random() * responses.length)];

            await interaction.reply(`You asked **"${question}"** and the Magic 8-ball says: **${response}**`);

        } catch (err) {
            logger.error(err.stack);
        }
    }
};
