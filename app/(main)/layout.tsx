import React from 'react';
import NavigationSidebar from '@/components/navigation-sidebar';
async function Layout({children} : {children: React.ReactNode}): Promise<React.JSX.Element> {
	return (
		<div className={'h-full'}>
			<div className={'hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'}>
				<NavigationSidebar />
			</div>

			<main className={'md:pl-[72px] h-full'}>
				{children}
			</main>

		</div>
	);
}

export default Layout;