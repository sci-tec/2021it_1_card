import G from "./global.js";
import CONFIG from "./config.js";
import shuffle from "./cardEffect/08shuffle.js";
import present from "./cardEffect/07present.js";
import cake from "./cardEffect/01cake.js";
// import haiboku from "./cardEffect/03haiboku.js";

import { develop } from "./develop.js";

$(() => {
    init();
    develop();
})

function init() {
    G.refresh = refresh;
    G.setCoverByPlayerId = setCoverByPlayerId;
    G.getAnswers = getAnswers;
    G.reset();
    G.drawCard();
    G.refresh();
    $(`.mat`).hide();

    addEventListeners();
}

function refresh() {
    for (let i = 0; i < G.players.length; i++) {

        // let board = document.getElementById("board");
        // board.innerHTML = "<div id='player" + (i + 1) + "name'>player" + (i + 1) + "</div>";
        // board.insertBefore(board, null)

        $(`#player${i + 1} .deck`).html("");

        $(`#player${i + 1}name`).css("color", G.players[i] == G.currentPlayer ? "#f00" : "#000");
        $(`#player${i + 1}name`).css("background-color", G.players[i].winlose != "lose" ? "#fff" : "#666");

        for (let j = 0; j < G.players[i].cards.length; j++) {
            // console.log(i, j, G.players[i].cards[j]);

            let card = `<div class="card" data-cardid = "${G.players[i].cards[j].id}" data-imageid = "${G.players[i].cards[j].imgId}"><div class="title"><img src="${"images/image" + G.players[i].cards[j].imgId + ".jpg"}">${G.players[i].cards[j].title}</div><div class="text">${G.players[i].cards[j].text}</div></div>`;

            // console.log(card);

            $(`#player${i + 1} .deck`).append(card);
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

        console.log(G.getPlayerIdByCardId(cardid)[0], cardid, imageid)
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
        case 1:
            cake();
            break;
        case 2:
            // doutoku(G.players)
            break;
        case 3:
            // haiboku(G.players)
        case 7:
            present(G.players)
            break;
        case 8:
            shuffle(G.players)
            break;
        default: 
            present(G.players);
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

function setCoverByPlayerId(playerId, isCover, option = {}) {
    if(isCover) {
        $(`#player${playerId+1} .mat`).show();
    } else {
        $(`#player${playerId+1} .mat`).hide();
    }

    if(option.classes) {
        $(`#player${playerId+1} .mat`).addClass(option.classes);
        console.log(option);
    }
}

function getAnswers(option, callback) {
    console.log(option, callback);
    for (let i = 0; i < G.players.length; i++) {
        let text = `<h2>【${option.title}】</h2><div class="text">${option.text}</div><div class="options"></div>`;
        $(`#player${i + 1} .mat`).html(text);

        for(let j=0; j < option.options.length; j++) {
            let btn = `<div class="button" data-optionid="${j}">${option.options[j]}</div>`;
            $(`#player${i + 1} .mat .options`).append(btn)
        }

        $(`#player${i + 1} .mat .options .button`).click((e)=>{
            let text = $(e.currentTarget).html();
            let optionid = $(e.currentTarget).data("optionid");
            $(`#player${i + 1} .mat .options`).html(`<h2>回答: ${text}</h2>`);
            callback(i, optionid);
        });        
    }
}