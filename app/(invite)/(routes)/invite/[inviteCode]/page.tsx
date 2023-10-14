import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import currentProfile from '@/lib/current-profile';
import {Profile, Server} from '@prisma/client';
import {redirectToSignIn} from '@clerk/nextjs';
import {redirect} from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {db} from '@/lib/db';

type Props = {
	params: {
		inviteCode: string
	}
}
async function Page({params} : Props): Promise<React.JSX.Element | null>{
	const profile: Profile | null = await currentProfile();
	if(!profile) {
		return redirectToSignIn();
	}

	if(!params.inviteCode) {
		return  redirect('/');
	}

	//  check if this server has current user
	const existingServer: Server | null = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	// current user already in this server, just redirect to that server page
	if(existingServer) {
		return redirect(`/servers/${existingServer.id}`);
	}


	// current user not in this server, add user to server
	const newServer = await db.server.update({
		where: {
			inviteCode: params.inviteCode,
		},

		data: {
			members: {
				create: [
					{
						profileId: profile.id
					}
				]
			}
		}
	});

	if(newServer) {
		return redirect(`/servers/${newServer.id}`);
	}


	return null;
}

export default Page;