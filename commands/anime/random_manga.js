const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("random_manga")
        .setDescription("Replies with a random manga."),
    async execute(interaction)
    {
        const url = "https://api.jikan.moe/v4/random/manga";
        const response = await fetch(url);
        const json = await response.json();
        const manga = json.data.title;
        const mangaUrl = json.data.url;

        await interaction.reply(`Hey ${interaction.user.username}, here's a random manga for you: ${manga} (${mangaUrl})`);
    }
}