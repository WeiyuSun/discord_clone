import React from 'react';
import currentProfile from '@/lib/current-profile';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {Channel, Member} from '@prisma/client';
import {redirect} from 'next/navigation';
import {ChatHeader} from '@/components/chat-header';
import {ChatInput} from '@/components/chat-input';
import {ChatMessages} from '@/components/chat-messages';

type Props = {
	params: {
		serverId: string;
		channelId: string;
	}
}

async function Page({params}: Props): Promise<React.JSX.Element> {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const channel: Channel | null = await db.channel.findUnique({
		where: {
			id: params.channelId
		}
	});

	const member: Member | null = await db.member.findFirst({
		where: {
			serverId: params.serverId,
			profileId: profile.id
		}
	});

	if (!channel || !member) {
		redirect('/');
	}

	const queryProps = {
		channelId: channel.id,
		serverId: channel.serverId
	};

	return (
		<div className={'bg-white dark:bg-[#313338] flex flex-col h-full'}>
			<ChatHeader name={channel.name} serverId={channel.serverId} type={'channel'}/>
			<ChatMessages
				member={member}
				name={channel.name}
				chatId={channel.id}
				type={'channel'}
				apiUrl={'/api/messages'}
				socketUrl={'/api/socket/messages'}
				socketQuery={{
					channelId: channel.id,
					serverId: channel.serverId
				}}
				paramKey={'channelId'}
				paramValue={channel.id}/>

			<ChatInput apiUrl={'/api/socket/messages'} query={queryProps} name={channel.name} type={'channel'}/>
		</div>
	);
}

export default Page;