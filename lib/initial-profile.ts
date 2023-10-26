import {currentUser, redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {User} from '@clerk/backend';
import {Profile} from '@prisma/client';

export async function initialProfile() {
	const user: User | null = await currentUser();

	if (!user) {
		return redirectToSignIn();
	}



	const profile: Profile | null = await db.profile.findUnique({
		where: {
			userId: user.id
		}
	});

	if (profile) {
		return profile;
	}

	const newProfile: Profile = await db.profile.create({
		data: {
			userId: user.id,
			name: `${user.username}`,
			imageUrl: user.imageUrl,
			email: user.emailAddresses[0].emailAddress
		}
	});

	return newProfile;
}