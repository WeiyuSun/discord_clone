import React from 'react';
import {UploadDropzone} from '@/lib/uploadthings';
import Image from 'next/image';
import '@uploadthing/react/styles.css';
import {ImageFileType} from '@/types';

type FileUploadProps = {
	onChange: (url?: string) => void;
	value: string;
	endpoint: ImageFileType
}

function FileUpload({onChange, value, endpoint}: FileUploadProps) {
	const fileType = value?.split('.').pop();

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

export default FileUpload;