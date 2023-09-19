
// Подключение основного файла стилей
import "../scss/style.scss";

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";


/* Добавление класса touch для HTML если браузер мобильный */
// flsFunctions.addTouchClass();
/* Добавление loaded для body после полной загрузки страницы */
flsFunctions.addLoadedClass();

/*
Модуль работы со спойлерами
Документация:
Сниппет (HTML): spollers
*/
// flsFunctions.spollers();

/*
Модуль работы с табами
Документация:
Сниппет (HTML): tabs
*/
// flsFunctions.tabs();


/*
Попапы
Документация по работе в шаблоне:
Сниппет (HTML): pl
*/
// import './libs/popup.js';

// ========================================================================================================================================================================================================================================================
// Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Настройка подключения плагина слайдера Swiper и новых слайдеров выполняется в файле js/files/sliders.js
Документация по работе в шаблоне:
Документация плагина: https://swiperjs.com/
Сниппет(HTML): swiper
*/
// import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Прочее ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/* Подключаем файлы со своим кодом */
import "./files/initStartData";
import "./files/animateScoreIcon";

import "./files/slot";
// import "./files/shop";
// import "./files/quiz";
import "./files/betBox";
// import "./files/sapper.js";
// import "./files/flyGame.js";
// import "./files/bonusScreen.js";
// import "./files/youtube.js";
import "./files/finalScreen";
// import "./files/startScreen.js";
// import "./files/luckyDrum.js";
// import "./files/loaderPre.js";
// import "./files/progressLogic.js";
// import "./files/arkanoid.js";
// import "./files/aviator";
// import "./files/snake-game";

import "./files/script";
import "./files/events";

//============================================================================================================================================================================================================================================