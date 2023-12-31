import {db} from '@/lib/db';
import {NextResponse} from 'next/server';
import currentProfile from '@/lib/current-profile';
import {randomUUID} from 'crypto';
import {MemberRole, Server} from '@prisma/client';

type DeleteProps = {
	params: {
		serverId: string
	}
}
export async function DELETE(req: Request, { params: { serverId } }: DeleteProps) {
	try {
		const profile = await currentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const server = await db.server.delete({
			where: {
				id: serverId,
				profileId: profile.id,
			}
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('[SERVER_ID_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function POST(req: Request) {
	console.log('from backend');
	try {
		const {name, imageUrl} = await req.json();

		const profile = await currentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		const server: Server = await db.server.create({
			data: {
				profileId: profile.id,
				name,
				imageUrl,
				inviteCode: randomUUID(),
				channels: {
					create: [
						{name: 'general', profileId: profile.id}
					]
				},
				members: {
					create: [
						{profileId: profile.id, role: MemberRole.ADMIN}
					]
				},
			}
		});

		return NextResponse.json(server);
	} catch (e) {
		console.log('[Servers_Post]', e);
		return new NextResponse('Internal Error', {status: 500});
	}
}