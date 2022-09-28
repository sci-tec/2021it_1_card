import G from "../global.js";
import CONFIG from "../config.js";

export default function () {

    G.coverAll();

    
    
    let nakami = ["cat", "snake"];
    let r = Math.floor(Math.random() * nakami.length);

    let option = {
        title: "プレゼント。「いる」か「いらない」か",
        text: "「いる」か「いらない」かを選択して下さい",
        options: [
            "いる",
            "いらない"
        ]
    }

    let answers = [];

    G.getAnswers(option, (id, answerId) => {
        answers.push({ id: id, answerId: answerId });
        if (answers.length >= (G.players.length - G.losePlayers.length)) {
            judge();
        }
    });

    function judge() {

        // audio.src='./mp3/out.mp3';
        // audio.play();

        answers.map((d, i) => {

            if (nakami[r] == "cat") {
                
                if (d.answerId == 1) {
                    G.setCoverByPlayerId(i, true, { classes: "selected" })
                    console.log(nakami[r])
                
                    if(G.players[i].winlose == null) {
                        G.setPlayerLoseById(i);
                    }
                }

                G.showMessage({
                    text: "プレゼントは「猫」でした。いらないを選んだ人は敗北。",
                    time: 4000
                });

            } else {

                if (d.answerId == 0) {
                    G.setCoverByPlayerId(i, true, { classes: "selected" })
                    console.log(nakami[r])

                    if(G.players[i].winlose == null) {
                        G.setPlayerLoseById(i);
                    }
                }

                G.showMessage({
                    text: "プレゼントは「ヘビ」でした。いるを選んだ人は敗北。",
                    time: 4000
                });

            }
        });
        
        console.log("playersInfo", G.players);

        let tm = setInterval((e) => {
            clearTimeout(tm);
            G.hideCoverAll();
        }, 4000);
    }
}
