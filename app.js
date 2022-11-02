import G from "./global.js";
import CONFIG from "./config.js";

import cake from "./cardEffect/01cake.js";
import doutoku from "./cardEffect/02doutoku.js";
import haiboku from "./cardEffect/03haiboku.js";
import banana from "./cardEffect/04banana.js";
import twitter from "./cardEffect/05twitter.js";
import present from "./cardEffect/07present.js";
import shuffle from "./cardEffect/08shuffle.js";
import skip from "./cardEffect/10skip.js";
// import reset from "./cardEffect/09reset";

import { develop } from "./develop.js";

$(() => {
    init();
    develop();
})

function init() {
    G.refresh = refresh;
    G.setCoverByPlayerId = setCoverByPlayerId;
    G.getAnswers = getAnswers;
    G.showMessage = showMessage;
    G.reset();
    G.drawCard();
    G.refresh();

    addEventListeners();
    clickEvent();
}

function refresh() {

    showNextPlayer();

    for (let i = 0; i < G.players.length; i++) {

        // let board = document.getElementById("board");
        // board.innerHTML = "<div id='player" + (i + 1) + "name'>player" + (i + 1) + "</div>";
        // board.insertBefore(board, null)

        $(`#player${i + 1} .deck`).html("");

        $(`#player${i + 1}name`).css("color", G.players[i] == G.currentPlayer ? "#f00" : "#000");
        $(`#player${i + 1}name`).css("background-color", G.players[i].winlose != "lose" ? "#fff" : "#666");

        for (let j = 0; j < G.players[i].cards.length; j++) {
            // console.log(i, j, G.players[i].cards[j]);

            let card = `<div class="card" data-cardid = "${G.players[i].cards[j].id}" data-imageid = "${G.players[i].cards[j].imgId}"><div class="title"><img src="${"images/image" + G.players[i].cards[j].imgId + ".jpg"}"></div></div>`;

            // console.log(card);

            $(`#player${i + 1} .deck`).append(card);

        }
    }

}

function addEventListeners() {

    $(document).on('click', '.card', function () {

        // console.log("this.", $(this).data("cardid"));
        let cardid = $(this).data("cardid");
        let imageid = $(this).data("imageid");

        console.log("playerCardId=", G.getPlayerIdByCardId(cardid)[0], "cardId=", cardid, "imageId=", imageid)
        if (G.currentPlayer.id == G.getPlayerIdByCardId(cardid)[0]) {

            // cardplay(cardid);
            let card = G.useCard(cardid);
            showPreviewCard(card);

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

function clickEvent() {
    $(".btn1").click(function(){
        $("#rule").css("display", "block")
        console.log("btn-click!");
    });

    $(".btn2").click(function(){
        $("#rule").css("display", "none");
        console.log("btn-click!");
    });

    $(".btn3").click(()=>{
        $("#title").css("animation", "slide-out-anim 4.0s ease-out forwards");
    });

    $(".btn4").click(()=>{
        location.reload();
    });


}

function effect(imageid) {
    switch (imageid) {
        case 1:
            cake();
        break;
        case 2:
            doutoku(G.players)
        break;
        case 3:
            haiboku();
        break;
        case 4:
            banana();
        break;
        case 5:
            twitter();
        break;
        case 7:
            present();
        break;
        case 8:
            shuffle(G.players);
        break;
        case 9:
            // reset();
        break;
        case 10:
            skip(G.players);
        break;
        default: 
            // banana();
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
        $(`#board .txt`).html(text);

        for(let j=0; j < option.options.length; j++) {
            let btn = `<div class="button btn btnChoice" data-optionid="${j}">${option.options[j]}</div>`;
            $(`#board .txt .options`).append(btn)
        }

        $(`#board .txt .options .button`).click((e)=>{
            let text = $(e.currentTarget).html();
            let optionid = $(e.currentTarget).data("optionid");
            $(`#board .txt .options`).html(`<h2>回答: ${text}</h2>`);
            callback(i, optionid);
        });        
    }
}

function showMessage(option) {

    console.log(option);

    for (let i = 0; i < G.players.length; i++) {
        // console.log(i);
        let text = `<div>${option.text}</div><div class="options"></div>`;
        $(`#board .txt`).html(text);
        $(`#board .text2`).html(text);
    }

    let tm = setInterval(()=>{
        for (let i = 0; i < G.players.length; i++) {
            // console.log(i);
            $(`#board .text`).html("");
        }
        clearInterval(tm);
        G.hideCoverAll();
    }, option.time);

}

function showPreviewCard(card) {
    
    let html;
    console.log(card);

    if(card.canPreview == false) {
        html = `<div class="card" data-cardid = "${card.id}" data-imageid = "${card.imgId}"><div class="title"><img src="${"images/image" + card.imgId + ".jpg"}">${card.title}</div></div>`;
    } else {
        html = `<div class="card" data-cardid = "${card.id}" data-imageid = "${card.imgId}"><div class="title"><img src="${"images/image" + card.imgId + ".jpg"}">${card.title}</div><div class="text2">${card.text}</div></div>`;
    }

    $(`#previewCardUsisng`).html(html);
}

function showNextPlayer() {
    // let nextPlayer = G.getPlayerById(G.getNextPlayerId()).name;
    // console.log("nextPlayer", nextPlayer);
    // $(".nextPlayer").html("NextPlayer ➡ " + nextPlayer);

    $("#board .players .p").css("background-color", "#deb887");
    $("#board .players .player"+(G.currentPlayer.id+1)).css("background-color", "#cd853f");

}