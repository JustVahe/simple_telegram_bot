const dotenv = require("dotenv");
const TelegramApi = require("node-telegram-bot-api");
const express = require("express");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Bot is alive")
})
 

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramApi(token, { polling: true });
const buttonOptions = require("./options.option");
let game = false,randomNumber;

const startGame = (chat) => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    bot.sendMessage(chat, `Сейчас я загадал цыфру от 1 до 100, ты должен его угадать. 
    Если оно будет больше загаданной цифры, я напишу "Много", если меньше "Мало". Ну! Пиши цифру!`);
    game = true;
}

const gameOver = (chat) => {
    bot.sendMessage(chat, `Ех, жаль, цыфра была ${randomNumber}` , buttonOptions.gameAgainLoseButtonOptions);
    game = false;
}

const start = () => {

    bot.setMyCommands([
        { command: "/start", description: "Начало вечеринки" }
    ])

    bot.on("message", async msg => {

        const text = msg.text;
        const chat = msg.chat.id;

        if (text === "/start") {
            return await bot.sendMessage(chat, `Привет, я бот созданный из говна и палок, со мной ты можешь играть в "Угадай Цифру"`, buttonOptions.gameStartButtonOptions);
        } if (game) {

            const num = parseInt(text);

            if (num == randomNumber) {
                return await bot.sendMessage(chat, `Ну и ну, угадал мерзавец!`, buttonOptions.gameAgainWinButtonOptions);
            } else if (num < randomNumber) {
                return await bot.sendMessage(chat, `Мало`, buttonOptions.gameSurrenderButtonOptions);
            } else if (num > randomNumber) {
                return await bot.sendMessage(chat, `Много`, buttonOptions.gameSurrenderButtonOptions);
            }
        } else {
            return await bot.sendMessage(chat, "Да что ты чёрт побери такое несёшь????");
        }
        
    });

    bot.on("callback_query", async msg => {

        const command = msg.data;
        const chat = msg.message.chat.id;

        if (command === "/start_game") startGame(chat);
        else if (command ===  "/lose_game" ) gameOver(chat);
    })
}

start();