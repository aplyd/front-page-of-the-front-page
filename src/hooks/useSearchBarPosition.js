import { useLayoutEffect, useState } from 'react';

export const useSearchBarPosition = (ref) => {
	const [searchBarBottom, setSearchBarBottom] = useState();
	const [searchBarWidth, setSearchBarWidth] = useState();
	const [searchBarLeft, setSearchBarLeft] = useState();

	useLayoutEffect(() => {
		function updatePostion() {
			const right = ref.current.getBoundingClientRect().right;
			const left = ref.current.getBoundingClientRect().left;
			setSearchBarBottom(ref.current.getBoundingClientRect().bottom);
			setSearchBarLeft(left);
			setSearchBarWidth(right - left);
		}

		window.addEventListener('resize', updatePostion);
		updatePostion();

		return () => window.removeEventListener('resize', updatePostion);
	}, []);

	return { searchBarBottom, searchBarWidth, searchBarLeft };
};
