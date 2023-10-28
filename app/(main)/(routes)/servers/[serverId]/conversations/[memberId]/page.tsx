import React from 'react';
import currentProfile from '@/lib/current-profile';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {ChatHeader} from '@/components/chat-header';
import {redirect} from 'next/navigation';
import {getOrCreateConversation} from '@/lib/conversation';
import {ChatMessages} from '@/components/chat-messages';
import {ChatInput} from '@/components/chat-input';
import {MediaRoom} from '@/components/media-room';

type Props = {
	params: {
		memberId: string;
		serverId: string;
	},

	searchParams: {
		video?: boolean
	}
}

async function Page({params, searchParams}: Props) {
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

	const {memberOne, memberTwo} = conversation;

	const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

	return (
		<div className="bg-white dark:bg-[#313338] flex flex-col h-full">
			<ChatHeader
				imageUrl={otherMember.profile.imageUrl}
				name={otherMember.profile.name}
				serverId={params.serverId}
				type="conversation"
			/>

			{searchParams.video && (
				<MediaRoom chatId={conversation.id} video={true} audio={true} />
			)}

			{!searchParams.video && (
				<>
					<ChatMessages
						name={otherMember.profile.name}
						member={currentMember}
						chatId={conversation.id}
						apiUrl={'/api/direct-messages'}
						socketUrl={'/api/socket/direct-messages'}
						socketQuery={{
							conversationId: conversation.id
						}}
						paramKey={'conversationId'}
						paramValue={conversation.id}
						type={'conversation'}/>

					<ChatInput apiUrl={'/api/socket/direct-messages'} query={{
						conversationId: conversation.id
					}} name={otherMember.profile.name} type={'conversation'}/>
				</>
			)}
		</div>
	);
}

export default Page;