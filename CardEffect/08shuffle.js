import CONFIG from "../config.js"

export default function(players) {
    let tehuda = [];
    let num = [];
    // players[1].cards.pop()

    for (let i = 0; i < CONFIG.NUM_PLAYERS; i++) {
        num.push(players[i].cards.length)
        console.log(players[i].cards)
        tehuda.push(...players[i].cards)
    }

    for (let i = 0; i < CONFIG.NUM_PLAYERS; i++) {
        players[i].cards = [];

        for (let j = 0; j < num[i]; j++) {
            let r = Math.floor(Math.random() * (tehuda.length - 1))
            let card = tehuda.splice(r, 1)[0];
            // console.log("card2", card)
            // card.id = j;
            players[i].cards.push(card);
        }
    }
}
