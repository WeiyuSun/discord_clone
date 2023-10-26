import React from 'react';
import currentProfile from '@/lib/current-profile';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {ChatHeader} from '@/components/chat-header';
import {redirect} from 'next/navigation';
import {getOrCreateConversation} from '@/lib/conversation';

type Props = {
	params: {
		memberId: string;
		serverId: string;
	}
}

async function Page({params}: Props) {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const currentMember = await db.member.findFirst({
		where: {
			serverId: params.serverId,
			profileId: profile.id,
		},
		include: {
			profile: true,
		},
	});

	if (!currentMember) {
		return redirect('/');
	}

	const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

	if (!conversation) {
		return redirect(`/servers/${params.serverId}`);
	}

	const { memberOne, memberTwo } = conversation;

	const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

	return (
		<div className="bg-white dark:bg-[#313338] flex flex-col h-full">
			<ChatHeader
				imageUrl={otherMember.profile.imageUrl}
				name={otherMember.profile.name}
				serverId={params.serverId}
				type="conversation"
			/>
		</div>
	);
}

export default Page;