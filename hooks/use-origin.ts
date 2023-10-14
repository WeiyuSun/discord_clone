import {useEffect, useState} from 'react';

function useOrigin(): string {
	const  [mounted, setMounted] = useState(false);
	useEffect((): void => {
		setMounted(true);
	}, []);

	const origin: string = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

	if(!mounted) {
		return '';
	}

	return origin;
}

export {useOrigin};