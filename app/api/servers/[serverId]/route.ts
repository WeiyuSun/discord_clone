import {NextResponse} from 'next/server';
import {Profile, Server} from '@prisma/client';
import currentProfile from '@/lib/current-profile';
import {db} from '@/lib/db';

type Props = {
	params: {
		serverId: string
	}
};

async function PATCH(req: Request, {params: {serverId}}: Props) {
	try {
		const profile: Profile | null = await currentProfile();
		const {name, imageUrl} = await req.json();

		if (!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		const server: Server = await db.server.update({
			where: {
				id: serverId,
				profileId: profile.id
			},

			data: {
				name, imageUrl
			}
		});

		return NextResponse.json(server);

	} catch (e) {
		console.log('[SERVER_ID_PATCH]', e);
		return new NextResponse('Internal Error', {status: 500});
	}
}

export {PATCH};