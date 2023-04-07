const fs = require("fs");
const path = require("path");
const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

// cardInfo[0][0] = card image
// cardInfo[0][1] = card rarity

async function createCard(amount)
{
    const folder = path.join(__dirname, "commands/files/cardImages");
    const card = fs.readdirSync(folder).filter(file => file.endsWith(".jpeg"));
    let cardInfo = [];

    for (let i = 0; i < amount; i++)
    {
        // get random number between 0 and the length of card
        let randomCard = Math.floor(Math.random() * card.length);

        let rarity = Math.floor(Math.random() * 100);
        if (rarity < 50)
        {
            rarity = 0;
        }
        else if (rarity < 75)
        {
            rarity = 1;
        }
        else if (rarity < 94)
        {
            rarity = 2;
        }
        else if (rarity < 100)
        {
            rarity = 3;
        }
        else
        {
            rarity = 4;
        }

        cardInfo[i] = [card[randomCard], rarity];
        if (card[randomCard] == undefined)
        {
            console.log(randomCard);
        }
    }

    try 
    {
        cardInfo[amount] = await displayCard(cardInfo);        
    } 
    catch (error) 
    {
        return error;
    }

    return cardInfo;
}

async function displayCard(cardInfo)
{
    const canvas = Canvas.createCanvas(138 * cardInfo.length, 130);
    const context = canvas.getContext("2d");
    
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = 8;
    
    for (let i = 0; i < cardInfo.length; i++)
    {
        const image = await Canvas.loadImage(`./commands/files/cardImages/${cardInfo[i][0]}`);
        context.drawImage(image, 140 * i, 0, 130, 130);
        context.strokeStyle = getColour(cardInfo[i][1]);
        context.strokeRect(140 * i, 0, 130, 130);
    }
    
    const attachment = new AttachmentBuilder(await canvas.encode("jpeg"), { name: "card.jpeg" });
    
    return attachment;
}

function getColour(rarity)
{
    switch (rarity)
    {
        case 0:
            return "#FFFFFF";
        case 1:
            return "#808080";
        case 2:
            return "#0099ff";
        case 3:
            return "#A020F0";
        case 4:
            return "#FFA500";
        default:
            return "#FFA500";
    }
}

module.exports.createCard = createCard;
module.exports.displayCard = displayCard;