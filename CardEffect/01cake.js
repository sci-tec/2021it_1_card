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
        if(answers.length >= G.players.length) {
            judge();
        }
    });

    function judge() {

        // audio.src='./mp3/out.mp3';
        // audio.play();

        answers.map((d, i)=>{
            if(d.answerId==1) {
                G.setCoverByPlayerId(i, true, {classes: "selected"})
            }
        });

        let tm = setInterval((e)=>{
            clearTimeout(tm);
            G.hideCoverAll();
        }, 4000);
    }

}
