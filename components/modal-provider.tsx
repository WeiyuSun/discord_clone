'use client';

import {CreateServerModal} from '@/components/create-server-modal';

import React, {useEffect, useState} from 'react';
import {InviteModal} from '@/components/invite-modal';
import {EditServerModal} from '@/components/edit-server-modal';
import {MembersModal} from '@/components/members-modal';
import {CreateChannelModal} from '@/components/create-channel-modal';
import {LeaveServerModal} from '@/components/leave-server-modal';
import {DeleteServerModal} from '@/components/delete-server-modal';
import {DeleteChannelModal} from '@/components/delete-channel-modal';
import {EditChannelModal} from '@/components/edit-channel-modal';
import {MessageFileModal} from '@/components/message-file-modal';
import {DeleteMessageModal} from '@/components/delete-message-modal';

export function ModalProvider(): React.JSX.Element | null {
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
			<LeaveServerModal />
			<DeleteServerModal />
			<DeleteChannelModal />
			<EditChannelModal />
			<MessageFileModal />
			<DeleteMessageModal />
		</>
	);
}
