import G from "../global.js";
import CONFIG from "../config.js";

export default function() {
    const IRU = 0;
    const IRANAI = 1;
    G.getPlayersWithoutCurrentPlayer()

    let sentaku = prompt("半角で入力\n\n" + IRU + ":いる\n\n" + IRANAI + ":いらない")

    sentaku = parseInt(sentaku, 10)
    console.log(sentaku)

    if (sentaku == 0) {
        alert("プレゼントは猫でした。かわいいね")
    }　else {
        alert("プレゼントは猫でした。いらないを選んだ人は敗北。")
    }
}
