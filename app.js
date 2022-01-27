import G from "./global.js";
import CONFIG from "./config.js";
import shuffle from "./cardEffect/08shuffle.js";
import present from "./cardEffect/07present.js";

import { develop } from "./develop.js";

$(() => {
    init();
    develop();
})

function init() {
    G.refresh = refresh;
    G.reset();
    G.drawCard();
    G.refresh();
    addEventListeners();
}

function refresh() {
    for (let i = 0; i < G.players.length; i++) {

        // let board = document.getElementById("board");
        // board.innerHTML = "<div id='player" + (i + 1) + "name'>player" + (i + 1) + "</div>";
        // board.insertBefore(board, null)

        $(`#player${i + 1}`).html("");

        $(`#player${i + 1}name`).css("color", G.players[i] == G.currentPlayer ? "#f00" : "#000");
        $(`#player${i + 1}name`).css("background-color", G.players[i].winlose != "lose" ? "#fff" : "#666");

        for (let j = 0; j < G.players[i].cards.length; j++) {
            // console.log(i, j, G.players[i].cards[j]);
            $(`#player${i + 1}`).append(`<div class="card" data-cardid = "${G.players[i].cards[j].id}" data-imageid = "${G.players[i].cards[j].imgId}"><div class="title"><img src=${"images/image" + G.players[i].cards[j].imgId + ".jpg"}>${G.players[i].cards[j].title}</div><div class="text">${G.players[i].cards[j].text}</div></div>`);
        }
    }
}


function addEventListeners() {
    // let num;
    // for (let i = 0; i < G.players.length; i++) {
    //     num  = i + 1
    // }
    let n = G.currentPlayer.id + 1

    $(document).on('click', '.card', function () {


        console.log("this.", $(this).data("cardid"));
        let cardid = $(this).data("cardid");
        let imageid = $(this).data("imageid");

        console.log(G.getPlayerIdByCardId(cardid)[0], cardid)
        if (G.currentPlayer.id == G.getPlayerIdByCardId(cardid)[0]) {

            // cardplay(cardid);
            G.useCard(cardid);
            effect(imageid);
            G.getNextPlayer();
            G.drawCard();
            refresh();
        }
    });

    $(document).on("click", ".card", (e) => {
        let title = $(e.currentTarget).find(".title").html();
        let text = $(e.currentTarget).find(".text").html();
        tts(title, 2);
        tts(text, 2);
    });
}

function effect(imageid) {
    switch (imageid) {
        case 2:
            // doutoku(G.players)
            break;
        case 7:
            present(G.players)
            break;
        case 8:
            shuffle(G.players)
            break;
    }
    // addEventListeners();
}

// https://www.section.io/engineering-education/text-to-speech-in-javascript/
function tts(text, p = 0) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "ja";
    speech.text = text;
    speech.rate = 1;
    speech.pitch = p;

    // const uttr = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech)
}

function win(playerId) {
    console.log(playerId + "勝ちました")
}
