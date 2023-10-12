import React from 'react';
import currentProfile from '@/lib/current-profile';
import {Channel, ChannelType, Member, MemberRole, Profile} from '@prisma/client';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {ServerHeader} from '@/components/server-header';
import {ServerWithMembersWithProfiles} from '@/types';

type props = {
	serverId: string,
}

async function ServerSidebar({serverId}: props): Promise<React.JSX.Element> {
	const profile: Profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server: ServerWithMembersWithProfiles | null = await db.server.findUnique({
		where: {
			id: serverId
		},

		include: {
			channels: {
				orderBy: {
					createdAt: 'asc'
				}
			},
			members: {
				include: {
					profile: true
				},

				orderBy: {
					role: 'asc'
				}
			}
		},
	});

	if (!server) {
		return redirect('/');
	}

	const textChannels: Channel[] = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.TEXT));
	const audioChannels: Channel[] = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.AUDIO));
	const videoChannels: Channel[] = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.VIDEO));
	const members: Member[] = server?.members.filter((member) => (member.profileId === profile.id));
	const role: MemberRole | undefined = server.members.find(member => member.profileId === profile.id)?.role;

	return (
		<div className={'flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]'}>
			<ServerHeader server={server} role={role} />
		</div>
	);
}

export {ServerSidebar};