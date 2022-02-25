import "src/css/index.scss";
import "src/css/solar.scss";

import Solar from "src/js/solar";
const solar = new Solar("body");
solar.init();

import introJs from 'intro.js';
import 'intro.js/introjs.css';
const intro = introJs();
intro.setOptions({
    showProgress: false,
    showButtons: false,
    showBullets: false,
    steps: [{
        element: ".dg.main.a",
        title: "提示",
        intro: "控制器可以对场景进行变换",
        position: "bottom-left-aligned",
    }],
})

intro.start();