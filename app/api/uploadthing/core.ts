import {auth} from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import {SignedInAuthObject, SignedOutAuthObject} from '@clerk/backend';

const f = createUploadthing();

function handleAuth(): {userId: string} {
	const {userId}: SignedInAuthObject | SignedOutAuthObject = auth();

	if(!userId)
		throw new Error('Unauthorized');

	return {userId};
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	serverImage: f({ image: { maxFileSize: '4MB' } })
		// Set permissions and file types for this FileRoute
		.middleware(() => handleAuth())
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		.onUploadComplete(() => {}),

	messageFile: f(['image', 'pdf'])
		// Set permissions and file types for this FileRoute
		.middleware(() => handleAuth())
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;