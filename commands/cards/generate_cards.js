const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const cardHandler = require("../../card_handler.js");
const fs = require("fs");

let lastCalled = 0;
const amount = 3;

async function saveCard(cardInfo, userID)
{
    let file = fs.readFileSync("./commands/files/cards.json", "utf8");
    let dictionary = JSON.parse(file);
    let userExists = false;

    dictionary.forEach(user =>
    {
        if (user.userid == userID)
        {
            user.cards.push(cardInfo);
            userExists = true;
        }
    });

    if (!userExists)
    {
        dictionary.push({ userid: userID, cards: [cardInfo] });
    }

    fs.writeFileSync("./commands/files/cards.json", JSON.stringify(dictionary));
}

module.exports =
{
    data: new SlashCommandBuilder()
    .setName("generate_cards")
    .setDescription(`Generates a set of ${amount} cards.`),
    async execute(interaction)
    {
        let cooldownSeconds = 60 * 1;
        const timeLeft = (cooldownSeconds * 1000) - (new Date().getTime() - lastCalled);
        console.log(timeLeft);
        if (timeLeft > 0)
        {
            await interaction.reply(`You can only generate cards every ${cooldownSeconds} seconds (${Math.floor(timeLeft / 1000)} seconds left).`);       
            return;     
        }

        lastCalled = new Date().getTime();

        let cardInfo = [];
        try 
        {
            cardInfo = await cardHandler.createCard(amount);
        } 
        catch (error) 
        {
            console.log(error);
            await interaction.reply("Sorry! I'm having a moment right now. I'm gonna get choccy milk and try again.");
        }
        
        const exampleEmbed = 
        {
            title: "Card Drop",
            image:
            {
                url: `attachment://${cardInfo[amount].name}`
            }
        };

        const message = await interaction.reply({ embeds: [exampleEmbed], files: [cardInfo[amount]], fetchReply: true, components: [{ type: 1, components: [{ type: 2, style: 1, label: "1️⃣", custom_id: "1" }, { type: 2, style: 1, label: "2️⃣", custom_id: "2" }, { type: 2, style: 1, label: "3️⃣", custom_id: "3" }] }] });

        interaction.client.on("interactionCreate", async (interaction) =>
        {

            if (interaction.isButton())
            {
                await interaction.update({ components: [] });
                const card =
                {
                    name: cardInfo[interaction.customId - 1][0],
                    rarity: cardInfo[interaction.customId - 1][1]
                };
                
                await saveCard(card, interaction.user.id);
            }
        });

    }
}
