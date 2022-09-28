import G from "../global.js";
import CONFIG from "../config.js";

export default function() {

    G.coverAll();

    let option = {
        title: "ケーキか死か？",
        text: "ケーキか死かを選択して下さい",
        options: [
            "ケーキ",
            "死"
        ]
    }

    let answers = [];

    G.getAnswers(option, (id, answerId)=>{
        answers.push({ id: id, answerId: answerId });
        if(answers.length >= G.players.length -1) {
            judge();
        }
    });

    function judge() {

        // audio.src='./mp3/out.mp3';
        // audio.play();
    
        let cake = 0;
        let death = 0;

        answers.map((d, i)=>{
            if(d.answerId==1) {
                death += 1;
                G.setCoverByPlayerId(i, true, {classes: "selected"})
            } else {
                cake += 1;
            }
        });
        console.log("死", death);
        console.log("ケーキ", cake);

        // 過半数のプレイヤーが死を選んだ場合、あなたは敗北する。
        // 過半数がケーキを選んだ場合、死を選んだ人が敗北。
        // 同数だった場合、あなたは勝利する。
        
        if(cake < death) {

            G.setPlayerLoseById(G.currentPlayer.id);

        } else if(cake > death) {
            
            for(let i = 0; i < answers.length; i++) {
                if(answers[i].answerId == 1) {
                    G.setPlayerLoseById(i);
                }
            }
            console.log(answers)

        } else {
            for(let i = 0; i <= G.players.length; i++) {
                if(G.players[answers[i].id].winlose = null) {
                    G.players[answers[i].id].winlose = "win";
                    G.setPlayerWinById(i);
                }
            }
            console.log("playersInfo", G.players);
        }

        let tm = setInterval((e)=>{
            clearTimeout(tm);
            G.hideCoverAll();
        }, 4000);
    }

}
