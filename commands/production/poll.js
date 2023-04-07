const { SlashCommandBuilder } = require("discord.js");

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Creates a poll.")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("The question for the poll.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("options")
                .setDescription("A comma seperated list of the options for the poll.")
                .setRequired(true)),
    async execute(interaction)
    {
        try 
        {
            const question = interaction.options.getString("question");
            const options = interaction.options.getString("options").split(",");
    
            let msg = `${question}\n`;
            options.forEach((option, index) =>
            {
                option = option.trim();
                msg += `${index + 1}: ${option}\n`;
            });
    
            const message = await interaction.reply({ content: msg, fetchReply: true });
            
            for (let i = 1; i < options.length + 1; i++) 
            {
                message.react(`${i}️⃣`);            
            }
        } 
        catch (error) 
        {
            await interaction.reply(`Hey ${interaction.user.username}, unfortunately, I couldn't create a poll (This may be due to too many options).`);
        }
    }

}