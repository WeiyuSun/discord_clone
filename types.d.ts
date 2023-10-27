import {Member, Profile, Server} from '@prisma/client';
import {Server as NetServer} from 'net';
import {Server as SocketIOServer} from 'socket.io';
import {NextApiResponse} from 'next';

type ImageFileType = 'serverImage' | 'messageFile';

type ModalType = 'createServer' | 'editServer' | 'createChannel' | 'invite' | 'members' | 'leaveServer' | 'deleteServer' | 'deleteChannel' | 'editChannel' | 'messageFile';

export type ServerWithMembersWithProfiles = Server & {
	members: (Member & {profile: Profile})[];
}

export type NextApiResponseServerIo = NextApiResponse & {
	socket:Socket & {
		server: NetServer & {
			io: SocketIOServer;
		}
	}
}