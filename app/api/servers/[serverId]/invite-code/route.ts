import {NextResponse} from 'next/server';
import currentProfile from '@/lib/current-profile';
import {Profile, Server} from '@prisma/client';
import {db} from '@/lib/db';

export async function PATCH(req: Request, {params}: { params: { serverId: string } }) {
	try {
		const profile: Profile | null = await currentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		if (!params.serverId) {
			return new NextResponse('Server ID Missing', {status: 400});
		}

		const server: Server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id
			},

			data: {
				inviteCode: crypto.randomUUID()
			}
		});

		console.log(server);

		return NextResponse.json(server);
	} catch (e) {
		console.log('[SERVER_ID]', e);
		return new NextResponse('Internal Error', {status: 500});
	}
}