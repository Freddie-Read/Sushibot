const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("search_anime")
        .setDescription("Searches for an anime.")
        .addStringOption(option =>
            option.setName("anime")
                .setDescription("The query for the anime.")
                .setRequired(true)),
    async execute(interaction)
    {
        const anime = interaction.options.getString("anime");
        const url = `https://api.jikan.moe/v4/anime?q=${anime}&limit=5`;
        const response = await fetch(url);
        const json = await response.json();

        try
        {
            let topResults = [];
            let length = 5;
            if (json.data.length < 5)
            {
                length = json.data.length;
            }

            for (let i = 0; i < length; i++)
            {
                topResults.push([json.data[i].title, json.data[i].url]);
            }

            let msg = `Hey ${interaction.user.username}, here are the top ${length} results for ${anime}:\n`;

            topResults.forEach(result =>
            {
                msg += `${result[0]} (${result[1]})\n`;
            });

            await interaction.reply(msg);
        } 
        catch (error) 
        {
            await interaction.reply(`Hey ${interaction.user.username}, unfortunately, I couldn't find any results for '${anime}'.`);
        }
        
    }
}