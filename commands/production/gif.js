const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Replies with a gif.")
        .addStringOption(option =>
            option.setName("search")
                .setDescription("The search term for the gif.")
                .setRequired(true)),

    async execute(interaction)
    {
        const search = interaction.options.getString("search");
        const url = `https://api.tenor.com/v1/search?q=${search}&key=${process.env.TENOR_KEY}&limit=50`;
        const response = await fetch(url);
        const json = await response.json();
        const randomGif = Math.floor(Math.random() * json.results.length);
        const gif = json.results[randomGif].media[0].gif.url;

        await interaction.reply(gif);
    }
}