module.exports = {
    gameStartButtonOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Сыграем?', callback_data: '/start_game'}],
            ]
        })
    }, gameAgainWinButtonOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Снова?', callback_data: '/start_game'}],
            ]
        })
    }, gameAgainLoseButtonOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Снова?', callback_data: '/start_game'}]
            ]
        })
    }, gameSurrenderButtonOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Сдатсья?', callback_data: '/lose_game'}]
            ]
        })
    }
}