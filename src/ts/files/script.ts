import { getRandom, addMoney, checkCollision } from './functions';
import { showFinalScreen } from './finalScreen';

interface IUserConfigGame {
	width: number;
	height: number;
	isLeftTouchHold: boolean;
	isRightTouchHold: boolean;
}

interface IConfigFlyGame {
	state: number;
	stepVy: number;
	weightVy: number;
	vx: number;
	xOffset: number;

	isCreatedCoins: boolean;
	startY: number;
	coins: Coin[];
	maxCoins: number;
	score: number;
	coeff: number;

	time: number;
	timeLimit: number;


	timeConst: number;
	timeCurrent: number;
	timeSecLimit: number;
	timer: boolean;
	user: IUserConfigGame;
}

export const configFlyGame: IConfigFlyGame = {
	state: 1, // 1 - no playing, 2 - play

	stepVy: 1,
	weightVy: 0.02,
	vx: 1.5,
	xOffset: 0,

	isCreatedCoins: false,

	startY: 100,

	coins: [],
	maxCoins: 50,

	score: 0,
	coeff: 10,

	time: 0,
	timeLimit: 1000,

	timeConst: 30, // 30
	timeCurrent: 30,
	timeSecLimit: 0,
	timer: false,

	user: {
		width: 66,
		height: 120,
		isLeftTouchHold: false,
		isRightTouchHold: false,
	}
}

const timeBlock = document.querySelector('.time-box__time') as HTMLElement;
const hero = document.querySelector('.field__hero') as HTMLElement;
const field = document.querySelector('.field') as HTMLElement;

function drawStartPosHero() {
	const fieldwWidth = field.getBoundingClientRect().width;
	const heroWidth = hero.getBoundingClientRect().width;

	configFlyGame.xOffset = (fieldwWidth * 0.5) - (heroWidth * 0.5);

	hero.style.transform = `translateX(${configFlyGame.xOffset}px)`;
}

if (document.querySelector('.game')) drawStartPosHero();



export function startFlyGame() {
	configFlyGame.state = 2;

	animateFly(0);

	if (!configFlyGame.isCreatedCoins) {
		creatCoins();
		configFlyGame.isCreatedCoins = true;
	}
}

function moveWhenHold() {

	if (configFlyGame.user.isLeftTouchHold && configFlyGame.xOffset > 0) {
		configFlyGame.xOffset -= configFlyGame.vx;
	}
	if (configFlyGame.user.isRightTouchHold) {
		const fieldwWidth = field.getBoundingClientRect().width;
		const maxYOffset = fieldwWidth - configFlyGame.user.width;
		if (configFlyGame.xOffset < maxYOffset) configFlyGame.xOffset += configFlyGame.vx;
	}
}

function drawCurrentHeroPosition() {
	hero.style.transform = `translateX(${configFlyGame.xOffset}px)`;
}

class Coin {
	width: number;
	height: number;
	x: number;
	y: number;
	isActive: boolean;
	isCoin: number;
	speed?: number;
	coin?: HTMLDivElement;

	constructor() {
		this.width = 35;
		this.height = 39;

		this.x = Math.floor(Math.random() * window.innerWidth * 0.5 + 50);
		this.y = -this.width;

		this.drawStartSpeed();

		this.isActive = false;

		this.isCoin = getRandom(1, 3);

		this.draw();
	}

	draw() {
		this.coin = document.createElement('div');

		this.coin.style.transform = `translate(${this.x}px, 0)`;

		this.drawCurrentClassName();

		document.querySelector('.field__body')?.append(this.coin);
	}

	drawStartSpeed() {
		if (this.isCoin === 1) this.speed = getRandom(1, 12);
		else if (this.isCoin === 2) this.speed = getRandom(1, 5);
	}

	drawCurrentClassName() {
		this.coin?.setAttribute('class', 'field__coin');
		if (this.isCoin === 1) this.coin?.setAttribute('data-element', '1');
		else if (this.isCoin === 2) this.coin?.setAttribute('data-element', '2');
	}

	update() {
		if (this.isActive) {
			if (this.coin && this.y < window.innerHeight && this.speed && !this.coin?.classList.contains('_get')) {
				this.y += this.speed;
				this.coin.style.transform = `translate(${this.x}px, ${this.y}px)`;
			} else if (this.coin && this.y < window.innerHeight && this.coin.classList.contains('_get')) {
				this.coin.style.transform = `translate(${this.x}px, ${this.y}px) scale(1.5)`;
			} else {
				this.reset();
			}
		}
	}

	reset() {
		this.isActive = false;
		this.isCoin = getRandom(1, 3);

		this.x = Math.floor(Math.random() * window.innerWidth * 0.5 + 50);
		this.y = -this.width;

		if (this.coin) this.coin.style.transform = `translate(${this.x}px, ${this.y}px)`;

		if (this.coin && this.coin.classList.contains('_get')) {
			this.coin.classList.remove('_get');
		}

		this.drawCurrentClassName();
		this.drawStartSpeed();
	}

}

function creatCoins() {
	for (let i = 0; i < configFlyGame.maxCoins; i++) {
		const newCoin = new Coin();
		configFlyGame.coins.push(newCoin);
	}
}

let lastTime = 0;

function animateFly(timeStamp: number) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;

	// Таймер обратного отсчета - отображаем оставшееся время и проверяем закончилось ли время
	timer(deltaTime);

	addNewFreeCoin(deltaTime);

	const planeInfo = hero.getBoundingClientRect();
	const coinsDom = document.querySelectorAll('[data-element');

	if (coinsDom.length) {
		coinsDom.forEach(coin => {
			const coinInfo = coin.getBoundingClientRect();
			if (checkCollision(planeInfo, coinInfo) && !coin.classList.contains('_get')) {

				if (coin.getAttribute('data-element') == '1') {
					coin.classList.add('_get');
					configFlyGame.score += 10;
				} else if (coin.getAttribute('data-element') == '2') {
					coin.classList.add('_get');
					gameOver();
				}

			}
		})
	}

	configFlyGame.coins.forEach(coin => {
		coin.update();
		if (coin.coin?.classList.contains('_get')) {

			setTimeout(() => {
				coin.reset();
			}, 500);
		}
	})

	// Движение игрока
	moveWhenHold();
	drawCurrentHeroPosition();

	// Условие работы анимации
	if (configFlyGame.state === 2) window.requestAnimationFrame(animateFly);

}


function gameOver() {
	configFlyGame.state = 1;
	setTimeout(() => {
		document.querySelector('.wrapper')?.classList.remove('_game');
	}, 500);
	setTimeout(() => {
		stopFlyGame();
	}, 1000);
}

function addNewFreeCoin(deltaTime: number) {
	if (configFlyGame.time > configFlyGame.timeLimit) {
		configFlyGame.time = 0;

		for (let i = 0; i < configFlyGame.coins.length; i++) {
			if (configFlyGame.coins[i].isActive) continue;
			else if (!configFlyGame.coins[i].isActive) configFlyGame.coins[i].isActive = true;
			break;
		}

	} else {
		configFlyGame.time += deltaTime;
	}
}

export function stopFlyGame() {
	configFlyGame.coins.forEach(coin => {
		coin.reset();
	})
	resetDataFlyGame();
	drawStartPosHero();
}

function resetDataFlyGame() {
	configFlyGame.score = 0;
	configFlyGame.timeCurrent = configFlyGame.timeConst;
}


export function resetFlyGame() {
	stopFlyGame();

	setTimeout(() => {
		startFlyGame();
	}, 250);
}


function timer(deltatime: number) {

	if (configFlyGame.timeSecLimit >= 1000) {
		configFlyGame.timeSecLimit = 0;

		--configFlyGame.timeCurrent;

		if (configFlyGame.timeCurrent > 9) timeBlock.textContent = `0:${configFlyGame.timeCurrent}`;
		else timeBlock.textContent = `0:0${configFlyGame.timeCurrent}`;

		// Если время закончилось
		if (configFlyGame.timeCurrent <= 0) {

			const winCount = configFlyGame.score * configFlyGame.coeff;

			addMoney(winCount, '.score', 1000, 2000);

			showFinalScreen(winCount);

			setTimeout(() => {
				stopFlyGame();
			}, 500);

			configFlyGame.coins.forEach(coin => {
				coin.reset();
			})

			// Останавливаем анимацию
			configFlyGame.state = 1;
		}
	} else {
		configFlyGame.timeSecLimit += deltatime;
	}
}

// export { };