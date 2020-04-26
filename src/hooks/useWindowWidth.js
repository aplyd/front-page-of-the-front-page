import { useEffect } from 'react';

export const useWindowWidth = (setWidth) => {
	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [setWidth]);
};
