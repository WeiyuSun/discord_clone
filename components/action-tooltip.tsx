'use client';

import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

type ActionTooltipProps = {
	label: string;
	children?: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
}

export function ActionTooltip({label, children, side, align}: ActionTooltipProps): React.JSX.Element {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>
					{children}
				</TooltipTrigger>

				<TooltipContent side={side} align={align}>
					<p className={'font-semibold text-sm capitalize'}>
						{label.toLowerCase()}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}