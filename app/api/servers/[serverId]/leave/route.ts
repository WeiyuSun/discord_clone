import {NextResponse} from 'next/server';
import {Profile} from '@prisma/client';
import currentProfile from '@/lib/current-profile';
import {db} from '@/lib/db';

type Props = {
	params: {
		serverId: string
	}
}
export async function PATCH(req: Request, {params: {serverId} }: Props) {
	try{
		const profile: Profile | null = await currentProfile();

		if(!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		if(!serverId) {
			return new NextResponse('Server ID Missing', {status: 400});
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				profileId: {
					not: profile.id
				},
				members: {
					some: {
						profileId: profile.id
					}
				}
			},
			data: {
				members: {
					deleteMany: {
						profileId: profile.id
					}
				}
			}
		});

		return NextResponse.json(server);
	} catch (e) {
		console.log('[SERVER_ID_LEAVE]', e);
		return new NextResponse('Internal Error', {status: 500});
	}
}