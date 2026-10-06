// ==UserScript==
// @name Headphone - Focus YouTube Skip button
// @namespace https://github.com/DanielBenvenutti/youtube-headphone-skip
// @version 1.0.0
// @description Focuses YouTube's visible Skip button so a real Enter key can activate it.
// @match https://www.youtube.com/*
// @grant none
// ==/UserScript==

(function () {
	'use strict';
	
	function isVisible(element) {
		if (!element) return false;
		const rect = element.getBoundingClientRect();
		const style = getComputedStyle(element);
		return (
			rect.width > 0 &&
			rect.height > 0 &&
			style.display !== 'none' &&
			style.visibility !== 'hidden'
		);
	}
	
	function findSkipButton() {
		const selectors = [
			'.ytp-skip-ad-button',
			'.ytp-ad-skip-button',
			'.ytp-ad-skip-button-modern',
			'.ytp-ad-skip-button-slot button',
			'.ytp-ad-skip-button-container button'
		];
		
		for (const selector of selectors) {
			for (const button of document.querySelectorAll(selector)) {
				if (!isVisible(button)) continue;
				if (button.disabled) continue;
				
				const text = (
				button.innerText ||
				button.textContent ||
				button.getAttribute('aria-label') ||
				''
				).trim();
				
				if (
					/pular|skip/i.test(text) ||
					button.classList.contains('ytp-skip-ad-button')
				) {
					return button;
				}
			}
		}
		
		return null;
	}
	
	setInterval(function () {
		const button = findSkipButton();
		
		if (button && document.activeElement !== button) {
			button.focus({ preventScroll: true });
			console.log('[Headphone Skip] Skip button focused.');
		}
	}, 250);
})();
