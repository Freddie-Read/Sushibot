const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Sends a DM to the user."),
    async execute(interaction)
    {
        await interaction.user.send(`I'm in your walls ${interaction.user.username}. I've been watching you since you joined this server on ${interaction.guild.joinedAt}. I know your deepest secrets. I know your darkest desires. I know everything about you. Fear me.`);
        await interaction.reply(`Hey ${interaction.user.username}, I sent you a DM! Check your DMs!`);
    }
};