import CONFIG from "./config.js";
import shuffle from "./CardEffect/08shuffle.js.js";

let cards;
let players;
let usedCards;
let currentPlayer;

$(() => {
    init();
})

function init() {
    cards = [];
    players = [];
    usedCards = [];
    initCards();
    initPlayers();
    develop();
    refresh();
    addEventListeners();
    addEventlisteners();
    currentPlayer = players[0];
    getNextPlayer()
}

// カードを枚数分生成している。
function initCards() {
    for (let i = 0; i < CONFIG.NUM_CARDS; i++) {
        let r = Math.floor(Math.random() * CONFIG.SEED_CARD.length);
        let duplicated = JSON.parse(JSON.stringify(CONFIG.SEED_CARD));
        let card = duplicated.splice(r, 1)[0];
        card.id = i;
        cards.push(card);
    }
}

// プレイヤーの初期設定（カードの配布）
function initPlayers() {
    for (let i = 0; i < CONFIG.NUM_PLAYERS; i++) {
        let player = getNewPlayer(i, "player" + i);
        for (let j = 0; j < CONFIG.NUM_INITIAL_CARDS; j++) {
            let r = Math.floor(Math.random() * cards.length);
            let card = cards.splice(r, 1)[0];
            card.isUsed = false;
            player.cards.push(card);
        }
        players.push(player);
    }
}

function getNewPlayer(id, name) {
    return {
        id: id,
        name: name,
        winlose: null,
        cards: [],
    }
}

// コンソールに表示する。
function showData() {
    console.log("players", players);
    console.log(cards);
    console.log("used", usedCards);
    console.log("current", currentPlayer)
}

function getPlayerById(id) {
    // return players.find(i=>i.id==id);

    for (let i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            return players[i];
        }
    }
    return null;
}

// 勝ち負けの設定
function setPlayerLoseById(id) {
    getPlayerById(id).winlose = "lose";
    // refresh()
}
function setPlayerWinById(id) {
    getPlayerById(id).winlose = "win";
}

function develop() {
    $("#btnReset").click(() => {
        init();
    });
    $("#btnShowData").click(() => {
        showData();
    });
    $("#btnLose").click(() => {
        let id = $("#txtPlayerId").val();
        setPlayerLoseById(id);
        showData();
    });
    $("#btnWin").click(() => {
        let id = $("#txtPlayerId").val();
        setPlayerWinById(id);
        showData();
    });
    $("#btnNext").click(() => {
        getNextPlayer()
    });
}

function refresh() {
    for (let i = 0; i < players.length; i++) {
        $(`#player${i + 1}`).html("");
        for (let j = 0; j < players[i].cards.length; j++) {
            // console.log(i, j, players[i].cards[j]);
            $(`#player${i + 1}`).append(`<div class="card" data-cardid = "${players[i].cards[j].id}" data-imageid = "${players[i].cards[j].imgId}"><div class="title"><img src=${"image" + players[i].cards[j].imgId + ".jpg"} height="200", width="150"></div><div class="text">${players[i].cards[j].text}</div></div>`);
        }
    }
}

function drawCard() {
    let card = cards.splice(1, 1)[0];
    card.isUsed = false;
    currentPlayer.cards.push(card);
}

function addEventListeners() {
    $(document).on('click', '.card', function () {
        console.log("this.", $(this).data("cardid"));
        let cardid = $(this).data("cardid");
        let imageid = $(this).data("imageid");
        effect(imageid);
        cardplay(cardid);
        refresh();
    });
}

function effect(imageid) {
    switch (imageid) {
        case 2:
            doutoku(players)
            break;
        case 8:
            shuffle(players)
            break;
    }
    getNextPlayer()
}

function addEventlisteners() {
    $(document).on("click", ".card", (e) => {
        let title = $(e.currentTarget).find(".title").html();
        let text = $(e.currentTarget).find(".text").html();
        tts(title, 0);
        tts(text, 2);
    });

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

function cardplay(cardId) {
    let [playerId, cId] = getPlayerIdByCardId(cardId);
    console.log(playerId, cId);
    let card = players[playerId].cards.splice(cId, 1)[0];
    usedCards.push(card);
    console.log(usedCards);
}

function getPlayerIdByCardId(Id) {
    for (let i = 0; i < players.length; i++) {
        for (let j = 0; j < players[i].cards.length; j++) {
            if (players[i].cards[j].id == Id) {
                return [i, j];
            }
        }
    }
    return [null, null];
}


function getNextPlayer() {
    current()

   let nextId = ( currentPlayer.id + 1) % players.length
    console.log("currentid",currentPlayer.id)

    while (players[nextId].winlose == "lose") {
        nextId = (nextId + 1) % players.length
    }
    if (nextId == currentPlayer.id) {
        win(nextId)
    } else {
        currentPlayer = players[nextId]
    }
}
function win(playerId) {
    console.log(playerId + "勝ちました")
}

function current() {

    let player = document.getElementsBy
    play


}