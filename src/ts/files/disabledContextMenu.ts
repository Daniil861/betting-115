const buttonLeft = document.querySelector('[data-button="btn-left"]') as HTMLElement;
const buttonRight = document.querySelector('[data-button="btn-right"]') as HTMLElement;

// отмена вызова контекстного меню при удерживании касания на мобильных устройствах
document.addEventListener('touchstart', blockedCntxtMenu, false);

function blockedCntxtMenu(e: TouchEvent) {
	let targetElement = e.target as HTMLElement;
	if (targetElement.closest('[data-button="fly-down"]') || targetElement.closest('[data-button="fly-up"]')) {
		targetElement.oncontextmenu = function () {
			return false;
		}
	}
}



// Отмена выделения текста на айфоне
const disableTextSelection = (element: HTMLElement): void => {
	let startSelection: number, endSelection: number;

	const disableTouchStart = (e: TouchEvent): void => {
		const target = e.target as HTMLInputElement;
		if (target.selectionStart) startSelection = target.selectionStart;
		if (target.selectionEnd) endSelection = target.selectionEnd;

		if (startSelection === endSelection) {
			e.preventDefault();
		}
	};

	const disableTouchMove = (e: TouchEvent): void => {
		e.preventDefault();
	};

	element.addEventListener('touchstart', disableTouchStart);
	element.addEventListener('touchmove', disableTouchMove);
};


if (buttonLeft) disableTextSelection(buttonLeft);

if (buttonRight) disableTextSelection(buttonRight);