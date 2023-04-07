const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Replies with your avatar.")
        .addUserOption(option => option.setName("user").setDescription("The user\'s avatar to show")),
    async execute(interaction)
    {
        const user = interaction.options.getUser("user");
        
        if (user)
        {
            return interaction.reply(`${user.username}"s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        }
        return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
    }
}