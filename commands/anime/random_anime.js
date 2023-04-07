const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("random_anime")
        .setDescription("Replies with a random anime."),
    async execute(interaction)
    {
        const url = "https://api.jikan.moe/v4/random/anime";
        const response = await fetch(url);
        const json = await response.json();
        const anime = json.data.entry.title;
        const animeUrl = json.data.entry.url;

        await interaction.reply(`Hey ${interaction.user.username}, here's a random anime for you: ${anime} (${animeUrl})`);
    }
}