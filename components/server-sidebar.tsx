import React from 'react';
import currentProfile from '@/lib/current-profile';
import {Channel, ChannelType, MemberRole, Profile} from '@prisma/client';
import {redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {ServerHeader} from '@/components/server-header';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ServerSearch} from '@/components/server-search';
import {Hash, Mic, ShieldAlert, ShieldCheck, Video} from 'lucide-react';

type props = {
	serverId: string,
}

const iconMap = {
	[ChannelType.TEXT]: <Hash className={'mr-2 h-4 w-4'}/>,
	[ChannelType.AUDIO]: <Mic className={'mr-2 h-4 w-4'}/>,
	[ChannelType.VIDEO]: <Video className={'mr-2 h-4 w-4'}/>
};

const roleIconMap = {
	[MemberRole.GUEST]: null,
	[MemberRole.MODERATOR]: <ShieldCheck className={'h-4 w-4 mr-2 text-indigo-500'}/>,
	[MemberRole.ADMIN]: <ShieldAlert className={'h-4 w-4 mr-2 text-rose-500'}/>
};

async function ServerSidebar({serverId}: props): Promise<React.JSX.Element> {
	const profile: Profile | null = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server = await db.server.findUnique({
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

	const textChannels = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.TEXT));
	const audioChannels = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.AUDIO));
	const videoChannels = server?.channels.filter((channel: Channel) => (channel.type === ChannelType.VIDEO));
	const members = server?.members.filter((member) => (member.profileId === profile.id));
	const role: MemberRole | undefined = server.members.find(member => member.profileId === profile.id)?.role;

	return (
		<div className={'flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]'}>
			<ServerHeader server={server} role={role}/>
			<ScrollArea className={'flex-1 px-3'}>
				<div className={'mt-2'}>
					<ServerSearch data={[
						{
							label: 'Text Channels',
							type: 'channel',
							data: textChannels?.map(channel => ({
								id: channel.id,
								name: channel.name,
								icon: iconMap[channel.type]
							}))
						},
						{
							label: 'Voice Channels',
							type: 'channel',
							data: audioChannels?.map(channel => ({
								id: channel.id,
								name: channel.name,
								icon: iconMap[channel.type]
							}))
						},
						{
							label: 'Video Channels',
							type: 'channel',
							data: videoChannels?.map(channel => ({
								id: channel.id,
								name: channel.name,
								icon: iconMap[channel.type]
							}))
						},
						{
							label: 'Members',
							type: 'member',
							data: members?.map(member => ({
								id: member.id,
								name: member.profile.name,
								icon: roleIconMap[member.role]
							}))
						}
					]}/>
				</div>
			</ScrollArea>
		</div>
	);
}

export {ServerSidebar};