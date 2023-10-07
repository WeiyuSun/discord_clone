import {auth} from '@clerk/nextjs';
import {db} from '@/lib/db';
import {Profile} from '@prisma/client';

async function currentProfile(): Promise<Profile | null>{
	const {userId} = auth();

	if(!userId){
		return null;
	}

	const profile: Profile | null= await db.profile.findUnique({
		where:{
			userId
		}
	});

	return profile;
}

export default currentProfile;