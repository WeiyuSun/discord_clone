'use client';

import {CreateServerModal} from '@/components/create-server-modal';

import React, {useEffect, useState} from 'react';
import {InviteModal} from '@/components/invite-modal';
import {EditServerModal} from '@/components/edit-server-modal';
import {MembersModal} from '@/components/members-modal';
import {CreateChannelModal} from '@/components/create-channel-modal';

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
			<InviteModal />
			<EditServerModal />
			<MembersModal />
			<CreateChannelModal />
		</>
	);
}

export {ModalProvider};