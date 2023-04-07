const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("joke")
        .setDescription("Replies with a joke.")
        .addStringOption(option =>
            option.setName("type")
                .setDescription("The type of joke.")
                .setRequired(true)
                .addChoices(
                    { name: "Programming", value: "Programming" },
                    { name: "Miscellaneous", value: "Miscellaneous" },
                    { name: "Dark", value: "Dark" },
                    { name: "Pun", value: "Pun" },
                    { name: "Spooky", value: "Spooky" },
                    { name: "Christmas", value: "Christmas" },
                    { name: "Any", value: "Any" }
                )),
    async execute(interaction)
    {
        const type = interaction.options.getString("type");
        const url = `https://v2.jokeapi.dev/joke/${type}?blacklistFlags=religious,racist,sexist&type=single`
        const response = await fetch(url);
        const json = await response.json();
        
        await interaction.reply(json.joke);
    }
}