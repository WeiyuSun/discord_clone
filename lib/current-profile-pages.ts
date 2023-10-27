import {getAuth} from '@clerk/nextjs/server';
import {db} from '@/lib/db';
import {Profile} from '@prisma/client';
import {NextApiRequest} from 'next';

async function currentProfilePages(req: NextApiRequest){
	const {userId} = getAuth(req);

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

export default currentProfilePages;