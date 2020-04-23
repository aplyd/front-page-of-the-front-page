import { useEffect } from 'react';

const useInitialFocus = (ref) => {
	useEffect(() => {
		ref.current.focus();
	}, [ref]);
};

export default useInitialFocus;
