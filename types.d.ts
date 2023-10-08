import {Server as PrismaServer, Profile as PProfile} from '@prisma/client';

type ImageFileType = 'serverImage' | 'messageFile';
type PServer = PrismaServer
type Server = PServer | null;
type Profile = PProfile | null;