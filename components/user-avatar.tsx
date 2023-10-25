import {Avatar, AvatarImage} from '@/components/ui/avatar';
import React from 'react';
import {cn} from '@/lib/utils';

type Props = {
	src?: string;
	className?: string;
}


export function UserAvatar({src, className}: Props): React.JSX.Element {
	return (
		<Avatar className={cn('h-7 md:h-10 md:w-10', className)}>
			<AvatarImage src={src}/>
		</Avatar>
	);
}
