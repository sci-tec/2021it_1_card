import G from "./global.js";

export function develop() {
    $("#btnReset").click(() => {
        G.reset();
    });
    $("#btnShowData").click(() => {
        G.showData();
    });
    $("#btnLose").click(() => {
        let id = $("#txtPlayerId").val();
        G.setPlayerLoseById(id);
        G.showData();
    });
    $("#btnWin").click(() => {
        let id = $("#txtPlayerId").val();
        G.setPlayerWinById(id);
        G.showData();
    });
    $("#btnNext").click(() => {
        G.getNextPlayer()
        G.refresh();
    });
    $("#btnDraw").click(() => {
        G.drawCard();
        G.refresh();
    });

};


