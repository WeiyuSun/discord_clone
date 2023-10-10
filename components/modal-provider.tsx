'use client';

import {CreateServerModal} from '@/components/create-server-modal';

import React, {useEffect, useState} from 'react';

function ModalProvider(): React.JSX.Element | null {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if(!isMounted) {
		return null;
	}

	return (
		<>
			<CreateServerModal/>
		</>
	);
}

export {ModalProvider};