const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("creator")
        .setDescription("Provides information about the creator."),
    async execute(interaction)
    {
        await interaction.reply("This bot was created by Freddie! You can find him and this project on GitHub: Freddie-Read (`https://github.com/Freddie-Read`)");
    }
}