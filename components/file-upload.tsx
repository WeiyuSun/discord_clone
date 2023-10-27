import React from 'react';
import {UploadDropzone} from '@/lib/uploadthings';
import Image from 'next/image';
import '@uploadthing/react/styles.css';
import {ImageFileType} from '@/types';
import {FileIcon, X} from 'lucide-react';

type FileUploadProps = {
	onChange: (url?: string) => void;
	value: string;
	endpoint: ImageFileType
}

export function FileUpload({onChange, value, endpoint}: FileUploadProps) {
	const fileType: string | undefined = value?.split('.').pop();

	if (value && fileType !== 'pdf') {
		return (
			<div className={'e-center'}>
				<div className="relative h-20 w-20">
					<Image
						fill
						src={value}
						alt="Upload"
						className="rounded-full"
						onClick={() => onChange('')}
					/>
				</div>

				<p className={'text-xs text-zinc-400 mt-2'}>
					Click Image to Re-Upload
				</p>
			</div>

		);
	}
	
	if (value && fileType === 'pdf') {
		return (
			<div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
				<FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
				<a
					href={value}
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
				>
					{value}
				</a>
				<button
					onClick={() => onChange('')}
					className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => {
			onChange(res?.[0].url);
		}} onUploadError={
			(error) => {
				console.log(error);
			}
		}/>
	);
}
