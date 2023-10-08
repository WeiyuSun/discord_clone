import React from 'react';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {initialProfile} from '@/lib/initial-profile';
import {InitialModal} from '@/components/initial-modal';
import {Profile, Server} from '@/types';

async function SetupPage(): Promise<React.JSX.Element> {
	const profile: Profile = await initialProfile();


	const server: Server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile?.id
				}
			}
		}
	});

	if(server){
		return  redirect(`/servers/${server.id}`);
	}

	return(
		<InitialModal />
	);
}

export default SetupPage;