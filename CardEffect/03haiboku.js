import G from "../global.js";
import CONFIG from "../config.js";

export default function() {
    
    G.coverAll();
    G.showMessage({
        text: "このカードを使うと敗北する。まじで",
        time: 4000
    })

    G.setPlayerLoseById(G.currentPlayer.id);

    setTimeout(()=>{
        $("#lose").css("display", "block");
    }, 4000);

}
