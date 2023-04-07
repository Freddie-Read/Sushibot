const { SlashCommandBuilder } = require("discord.js");
const cardHandler = require("../../card_handler.js");
const fs = require("fs");

async function getCards(userID)
{
    let file = fs.readFileSync("./commands/files/cards.json", "utf8");
    let dictionary = JSON.parse(file);
    let userExists = false;

    for (let i = 0; i < dictionary.length; i++)
    {
        if (dictionary[i].userid == userID)
        {
            userExists = true;
            return dictionary[i].cards;
        }        
    }

    if (!userExists)
    {
        return [];
    }
}

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("display_cards")
        .setDescription("Displays your cards."),
    async execute(interaction)
    {
        const cards = await getCards(interaction.user.id);
        
        if (cards.length == 0)
        {
            await interaction.reply("You don't have any cards yet! Generate some with /generate_cards!");
            return;
        }

        let cardInfo = [];
        for (let i = 0; i < cards.length; i++)
        {
            cardInfo[i] = [cards[i].name, cards[i].rarity];
        }

        let attachments = await cardHandler.displayCard(cardInfo);

        await interaction.reply({ files: [attachments], content: "Here are your cards!" });

        // await interaction.reply("This command is currently under construction.");
    }
};