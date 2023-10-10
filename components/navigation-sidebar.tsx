import React from 'react';
import {Profile, Server} from '@prisma/client';
import currentProfile from '@/lib/current-profile';
import {redirect} from 'next/navigation';
import {db} from '@/lib/db';
import {Separator} from '@/components/ui/separator';
import NavigationAction from '@/components/navigation-action';
import {ScrollArea} from '@/components/ui/scroll-area';
import {NavigationItem} from '@/components/navigation-item';
import {ModeToggle} from '@/components/mode-toggle';
import {UserButton} from '@clerk/nextjs';

async function NavigationSidebar(): Promise<React.JSX.Element>{
	const profile: Profile | null = await currentProfile();

	if(!profile){
		return redirect('/');
	}

	const servers: Server[] = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id
				}
			}
		}
	});

	if(servers === null){
		throw new Error('Unknown Error');
	}

	return (
		<div className={'space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3'}>
			<NavigationAction />
			<Separator className={'h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto'}/>
			<ScrollArea className={'flex-1 w-full'}>
				{servers.map((server: Server) => (
					<div key={server.id} className={'mb-4'}>
						<NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
					</div>
				))}
			</ScrollArea>

			<div className={'pb-3 mt-auto flex items-center flex-col gap-y-4'}>
				<ModeToggle />
				<UserButton afterSignOutUrl={'/'} appearance={{
					elements: {
						avatarBox: 'h-[48px] w-[48px]'
					}
				}}/>
			</div>
		</div>
	);
}

export default NavigationSidebar;