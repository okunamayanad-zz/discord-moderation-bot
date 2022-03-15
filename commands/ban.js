const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for the ban.')),
    async execute(interaction) {
        const { client } = require('discord.js')

        const { ownerId } = require('./../config.json');

        const user = interaction.options.getUser('user');
        var reason = interaction.options.getString('reason');


        if (!reason) {
            reason = "No reason provided.";
        }

        if (interaction.user.id === ownerId) {
            await interaction.reply(`${user} has been banned from the server.`);
            await user.createDM().then(async (c) => {c.send({content: 'You have been banned from the server. Reason: ' + reason})});
            await interaction.guild.members.ban(user, { reason: reason });
        } else if (interaction.author.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            await interaction.guild.members.ban(user, { reason: reason });
            await interaction.reply(`${user.username} was banned!`);
        } else if (interaction.author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            await interaction.guild.members.ban(user, { reason: reason });
            await interaction.reply(`${user.username} was banned!`);
        }
    },
}