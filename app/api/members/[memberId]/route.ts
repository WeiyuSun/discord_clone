import {NextResponse} from 'next/server';

import currentProfile from '@/lib/current-profile';
import {db} from '@/lib/db';
import {Profile} from '@prisma/client';
import {ServerWithMembersWithProfiles} from '@/types';

type Props = {
	params: {
		memberId: string
	}
}

export async function DELETE(req: Request, {params}: Props): Promise<NextResponse> {
	try {
		const profile: Profile | null = await currentProfile();
		const {searchParams} = new URL(req.url);

		const serverId: string | null = searchParams.get('serverId');

		if (!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		if (!serverId) {
			return new NextResponse('Server ID missing', {status: 400});
		}

		if (!params.memberId) {
			return new NextResponse('Member ID missing', {status: 400});
		}

		const server: ServerWithMembersWithProfiles = await db.server.update({
			where: {
				id: serverId,
				profileId: profile.id,
			},
			data: {
				members: {
					deleteMany: {
						id: params.memberId,
						profileId: {
							not: profile.id
						}
					}
				}
			},
			include: {
				members: {
					include: {
						profile: true,
					},
					orderBy: {
						role: 'asc',
					}
				},
			},
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('[MEMBER_ID_DELETE]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}

export async function PATCH(req: Request, {params}: Props): Promise<NextResponse> {
	try {
		const profile = await currentProfile();
		const {searchParams} = new URL(req.url);
		const {role} = await req.json();

		const serverId = searchParams.get('serverId');

		if (!profile) {
			return new NextResponse('Unauthorized', {status: 401});
		}

		if (!serverId) {
			return new NextResponse('Server ID missing', {status: 400});
		}

		if (!params.memberId) {
			return new NextResponse('Member ID missing', {status: 400});
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				profileId: profile.id,
			},
			data: {
				members: {
					update: {
						where: {
							id: params.memberId,
							profileId: {
								not: profile.id
							}
						},
						data: {
							role
						}
					}
				}
			},
			include: {
				members: {
					include: {
						profile: true,
					},
					orderBy: {
						role: 'asc'
					}
				}
			}
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('[MEMBERS_ID_PATCH]', error);
		return new NextResponse('Internal Error', {status: 500});
	}
}