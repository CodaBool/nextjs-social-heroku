import { useState, useEffect } from 'react'

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default function useScreen() {
	const [screenType, setScreenType] = useState(getScreenType());
	const resizeEvent = debounce(() => {
		setScreenType(getScreenType())
	}, 100);

	useEffect(() => {
		window.addEventListener('resize', resizeEvent);
		return () => {
			window.removeEventListener('resize', resizeEvent);
		};
	}, [])

	return screenType;
}

const getScreenType = () => {
	let screenType = null;

	if (typeof window !== 'undefined') {
		if (window.matchMedia('(max-width: 575px)').matches) {
			screenType = 'xsmall';
		} else if (window.matchMedia('(max-width: 768px)').matches) {
			screenType = 'small';
		} else if (window.matchMedia('(max-width: 991px)').matches) {
			screenType = 'medium';
		} else if (window.matchMedia('(max-width: 1199px)').matches) {
			screenType = 'large';
		} else {
			screenType = 'xlarge';
		}
	}
	return screenType;
}