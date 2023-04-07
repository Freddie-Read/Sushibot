const { SlashCommandBuilder } = require("discord.js");
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
        .setName("remove_card")
        .setDescription("Removes a card from your collection.")
        .addStringOption(option => option.setName("card_number").setDescription("The number of the card you want to remove.").setRequired(true)),
    async execute(interaction)
    {
        let cardNumber = interaction.options.getString("card_number");
        cardNumber--;
        const cards = await getCards(interaction.user.id);

        if (cards.length == 0)
        {
            await interaction.reply("You don't have any cards yet! Generate some with /generate_cards!");
            return;
        }

        if (cardNumber > cards.length)
        {
            await interaction.reply("That card doesn't exist!");
            return;
        }

        let file = fs.readFileSync("./commands/files/cards.json", "utf8");
        let dictionary = JSON.parse(file);

        for (let i = 0; i < dictionary.length; i++)
        {
            if (dictionary[i].userid == interaction.user.id)
            {
                dictionary[i].cards.splice(cardNumber, 1);
            }        
        }

        fs.writeFileSync("./commands/files/cards.json", JSON.stringify(dictionary));

        await interaction.reply("Card removed!");

    }
}