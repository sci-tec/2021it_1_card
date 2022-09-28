import G from "../global.js";
import CONFIG from "../config.js";

export default function() {
    
    G.coverAll();
    G.showMessage({
        text: "このカードを使うと敗北する。まじで",
        time: 4000
    })

    G.players[G.currentPlayer.id].winlose = "lose";

}
