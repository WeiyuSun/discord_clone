import {Member, Profile, Server} from '@prisma/client';

type ImageFileType = 'serverImage' | 'messageFile';

type ModalType = 'createServer' | 'editServer' | 'createChanel' | 'invite' | 'members';

export type ServerWithMembersWithProfiles = Server & {
	members: (Member & {profile: Profile})[];
}