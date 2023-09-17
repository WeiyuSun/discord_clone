import React from 'react';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {initialProfile} from '@/lib/initial-profile';
import {InitialModal} from '@/components/modal/initial-modal';

async function SetupPage() {
	const profile = await initialProfile();

	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	if(server) {
		return redirect(`/server/${server.id}`);
	}

	return <InitialModal/>;
}

export default SetupPage;