'use client';
import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {useModal} from '@/hooks/use-modal-store';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Check, Copy, RefreshCw} from 'lucide-react';
import {useOrigin} from '@/hooks/use-origin';
import axios, {AxiosResponse} from 'axios';


export function InviteModal(): React.JSX.Element | null {
	const {onOpen, isOpen, onClose, type, data} = useModal();
	const origin: string = useOrigin();

	const isModalOpen = isOpen && type === 'invite';
	const {server} = data;

	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const inviteUrl: string = `${origin}/invite/${server?.inviteCode}`;

	const onCopy = () => {
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);

		setTimeout((): void => {
			setCopied(false);
		}, 1000);
	};

	const onNew = async () => {
		try {
			setIsLoading(true);
			alert('fething');
			const res: AxiosResponse = await axios.patch(`/api/servers/${server?.id}/invite-code`);

			console.log(res);
			onOpen('invite',{server: res.data} );
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						Invite Friends
					</DialogTitle>
				</DialogHeader>

				<div className={'p-6'}>
					<Label className={'uppercase text-xs font-bold text-zinc-500' +
						' dark:text-secondary/70'}>
						Server invite link
					</Label>

					<div className={'flex items-center mt-2 gap-x-2'}>
						<Input
							disabled={isLoading}
							className={'bg-zinc-300/50  bottom-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'}
							value={inviteUrl}>
						</Input>

						<Button disabled={isLoading} onClick={onCopy} size={'icon'}>
							{
								copied
									? <Check className={'w-4 h-4'}/>
									: <Copy className={'w-4 h-4'}/>
							}
						</Button>
					</div>

					<Button
						onClick={onNew}
						disabled={isLoading}
						variant={'link'}
						className={'text-xs text-zinc-500 mt-4'}>
						Generate a new link
						<RefreshCw className={'w-4 h-4 ml-2'}/>
					</Button>


				</div>
			</DialogContent>
		</Dialog>
	);
}
