import G from "../global.js";
import CONFIG from "../config.js";

export default function() {
    G.coverAll();
    G.showMessage({
        text: "「バナナおいしいなぁ」",
        time: 4000
    });
}