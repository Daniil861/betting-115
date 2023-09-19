import { configFlyGame, startFlyGame, stopFlyGame } from './script';

const buttonLeft = document.querySelector('[data-button="btn-left"]') as HTMLElement;
const buttonRight = document.querySelector('[data-button="btn-right"]') as HTMLElement;

const field = document.querySelector('.field') as HTMLElement;

// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');

	const targetElement = e.target as HTMLElement;

	const money = Number(localStorage.getItem('money'));
	const bet = Number(localStorage.getItem('current-bet'));

	// privacy screen
	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	// main screen
	if (targetElement.closest('[data-button="privacy"]')) {
		location.href = 'index.html';
	}

	if (targetElement.closest('[data-button="forecast"]')) {
		wrapper?.classList.add('_forecast');
	}

	if (targetElement.closest('[data-button="forecast-home"]')) {
		wrapper?.setAttribute('class', 'wrapper');
	}

	if (targetElement.closest('[data-button="game"]')) {
		wrapper?.classList.add('_game');
		setTimeout(() => {
			startFlyGame();
		}, 250);
	}

	if (targetElement.closest('[data-button="game-home"]')) {
		wrapper?.setAttribute('class', 'wrapper');
		setTimeout(() => {
			configFlyGame.state = 1;
			stopFlyGame();
		}, 500);
	}

})

if (buttonLeft) {
	buttonLeft.addEventListener('touchstart', (e) => {
		configFlyGame.user.isLeftTouchHold = true;
	})
	buttonLeft.addEventListener('touchend', (e) => {
		configFlyGame.user.isLeftTouchHold = false;
	})
}

if (buttonRight) {
	buttonRight.addEventListener('touchstart', (e) => {
		configFlyGame.user.isRightTouchHold = true;
	})
	buttonRight.addEventListener('touchend', (e) => {
		configFlyGame.user.isRightTouchHold = false;
	})

}

