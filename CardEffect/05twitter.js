import G from "../global.js";
import CONFIG from "../config.js";

export default function() {
    
    G.coverAll();
    G.showMessage({
        text: "クラスメイトに自分のアカウントが見つかって、中二病がばれてしまう。世間体もゲームもあなたは敗北する。",
        time: 4000
    });
    
    G.setPlayerLoseById(G.currentPlayer.id);

}
