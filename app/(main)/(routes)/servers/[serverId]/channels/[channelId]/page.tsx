import React from 'react';
import currentProfile from '@/lib/current-profile';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {Channel, Member} from '@prisma/client';
import {redirect} from 'next/navigation';
import {ChatHeader} from '@/components/chat-header';
type Props = {
	params: {
		serverId: string;
		channelId: string;
	}
}

async function Page({params}: Props): Promise<React.JSX.Element> {
	const profile = await currentProfile();

	if(!profile){
		return  redirectToSignIn();
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

	if(!channel || !member){
		redirect('/');
	}

	return (
		<div className={'bg-white dark:bg-[#313338] flex flex-col h-full'}>
			<ChatHeader name={channel.name} serverId={channel.serverId} type={'channel'}/>
		</div>
	);
}

export default Page;