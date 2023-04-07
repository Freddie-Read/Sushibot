const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("test_attachment")
        .setDescription("Test attachment"),
    async execute(interaction)
    {        
        const file = new AttachmentBuilder("./commands/files/cardImages/sushipfp.jpeg");
        const exampleEmbed = new EmbedBuilder()
            .setTitle("Sushi")
            .setImage("attachment://sushipfp.png");

        await interaction.reply({ embeds: [exampleEmbed], files: [file] });
    }
}