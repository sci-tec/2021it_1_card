import G from "../global.js";
import CONFIG from "../config.js"

export default function() {

    G.coverAll();

    for(let i=0; i<CONFIG.NUM_PLAYERS; i++) {
        if(G.players[i].winlose == null) {
            G.setPlayerWinById(i);
        }
    }
    console.log("winPlayer", G.winPlayers);
    
    G.showMessage({
        text:"道徳的には正しい。残っているすべてのプレイヤーは勝利",
        time:4000
    })

    let tm = setInterval((e) => {
        clearTimeout(tm);
        G.hideCoverAll();
    }, 4000);
    
}
