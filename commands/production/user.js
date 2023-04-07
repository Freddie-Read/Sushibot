const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info."),
    async execute(interaction)
    {
        const username = interaction.user.username;
        const nickname = interaction.member.nickname;
        const joinedAt = interaction.member.joinedAt;
        const createdAt = interaction.user.createdAt;

        let msg = `Hey there ${username}`;
        if (nickname != null)
        {
            msg += ` (or ${nickname})`;
        }
        msg += `! We're currently in ${interaction.channel}! You've been in ${interaction.guild} for`;

        let today = new Date();
        let joined = new Date(joinedAt);
        let created = new Date(createdAt);
        
        let daysSinceJoined = Math.floor((today - joined) / (1000 * 60 * 60 * 24));
        let daysSinceCreated = Math.floor((today - created) / (1000 * 60 * 60 * 24));

        msg += ` ${daysSinceJoined} days and you've been a Discord user for ${daysSinceCreated} days! That's a long time!`;

        await interaction.reply(msg);
    }
}