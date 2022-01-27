import CONFIG from "./config.js";

export default {

    cards: [],
    players: [],
    usedCards: [],
    currentPlayer: null,

    refresh: null,

    showData: function() {
        console.log("players", this.players);
        console.log(this.cards);
        console.log("used", this.usedCards);
        console.log("current", this.currentPlayer)
    },

    reset: function() {
        this.cards = [];
        this.players = [];
        this.usedCards = [];
        this.initCards();
        this.initPlayers();
        this.currentPlayer = this.players[0];
        this.refresh();
    },

    initCards: function() {
        for (let i = 0; i < CONFIG.NUM_CARDS; i++) {
            let r = Math.floor(Math.random() * CONFIG.SEED_CARD.length);
            let duplicated = JSON.parse(JSON.stringify(CONFIG.SEED_CARD));
            let card = duplicated.splice(r, 1)[0];
            card.id = i;
            this.cards.push(card);
        }
    },

    initPlayers: function() {
        for (let i = 0; i < CONFIG.NUM_PLAYERS; i++) {
            let player = this.getNewPlayer(i, "player" + i);
            for (let j = 0; j < CONFIG.NUM_INITIAL_CARDS; j++) {
                let r = Math.floor(Math.random() * this.cards.length);
                let card = this.cards.splice(r, 1)[0];
                card.isUsed = false;
                player.cards.push(card);
            }
            this.players.push(player);
        }
    },

    getNewPlayer: function(id, name) {
        return {
            id: id,
            name: name,
            winlose: null,
            cards: [],
        }
    },

    getPlayerById: function(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id == id) {
                return this.players[i];
            }
        }
        return null;
    },

    setPlayerLoseById: function(id) {
        this.getPlayerById(id).winlose = "lose";
    },
    
    getNextPlayer: function(){
        let nextId = ( this.currentPlayer.id + 1) % this.players.length
         console.log("currentid", this.currentPlayer.id)
     
         while (this.players[nextId].winlose == "lose") {
            nextId = (nextId + 1) % this.players.length
         }
         if (nextId == this.currentPlayer.id) {
            console.log(nextId + "勝ちました")
            // win(nextId)
         } else {
            this.currentPlayer = this.players[nextId]
         }
    },

    setPlayerWinById: function(id) {
        this.getPlayerById(id).winlose = "win";
    },
    
    getPlayerIdByCardId: function(Id) {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < this.players[i].cards.length; j++) {
                if (this.players[i].cards[j].id == Id) {
                    return [i, j];
                }
            }
        }
        return [null, null];
    },

    useCard: function(cardId) {
        let [playerId, cId] = this.getPlayerIdByCardId(cardId);
        // console.log(playerId, cId);
        let card = this.players[playerId].cards.splice(cId, 1)[0];
        this.usedCards.push(card);
        console.log(this.usedCards);
    },
    
    drawCard: function() {
        let card = this.cards.splice(1, 1)[0];
        card.isUsed = false;
        this.currentPlayer.cards.push(card);
    },

    getPlayersWithoutCurrentPlayer: function() {
        let arr = [];
        for (let i = 0; i < this.players.length; i++) {
            if(this.players[i]!=this.currentPlayer) {
                arr.push(this.players[i]);
            }
        }
        return arr;
    }
        

};


