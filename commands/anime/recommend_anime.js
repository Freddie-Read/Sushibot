const { SlashCommandBuilder } = require("discord.js");

async function getAnimeID(animeName)
{
    const url = `https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`;
    const response = await fetch(url);
    const json = await response.json();
    return json.data[0].mal_id;
}

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("recommend_anime")
        .setDescription("Replies with a recommended anime.")
        .addStringOption(option =>
            option.setName("anime")
                .setDescription("The name for the anime.")
                .setRequired(true)),
    async execute(interaction)
    {
        const animeID = await getAnimeID(interaction.options.getString("anime"));

        const url = `https://api.jikan.moe/v4/anime/${animeID}/recommendations`;
        response = await fetch(url);
        json = await response.json();
        
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
                topResults.push([json.data[i].entry.title, json.data[i].entry.url]);
            }

            let msg = `Hey ${interaction.user.username}, here are the top ${length} recommendations for ${interaction.options.getString("anime")}:\n`;

            topResults.forEach(result =>
            {
                msg += `${result[0]} (${result[1]})\n`;
            });

            await interaction.reply(msg);
        }
        catch (error)
        {
            console.log(error);
            await interaction.reply(`Hey ${interaction.user.username}, unfortunately, I couldn't find any recommendations for ${interaction.options.getString("anime")}.`);
        }
    }

}