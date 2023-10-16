import {Member, Profile, Server} from '@prisma/client';

type ImageFileType = 'serverImage' | 'messageFile';

type ModalType = 'createServer' | 'editServer' | 'createChannel' | 'invite' | 'members' | 'leaveServer' | 'deleteServer' ;


export type ServerWithMembersWithProfiles = Server & {
	members: (Member & {profile: Profile})[];
}