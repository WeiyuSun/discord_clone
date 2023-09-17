'use client';
import React from 'react';
import Image from 'next/image';
import {UploadDropzone} from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

interface FileUploadProps {
	onChange: (usl?: string) => void;
	value: string;
	endpoint: 'messageFile' | 'serverImage';
}

function FileUpload({onChange, value, endpoint}: FileUploadProps) {
	const fileType: string | undefined = value?.split('.').pop();

	if (value && fileType !== 'pdf') {
		return (
			<div className={'relative h-20 w-20 items-center'}>
				<Image fill src={value} alt={'Upload'} className={'rounded-full'} onClick={() => {
					onChange('');
				}}/>
			</div>
		);
	}
	return (
		<UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => {
			onChange(res?.[0].url);
		}} onUploadError={(error: Error) => {
			console.log(error);
		}}
		/>
	);
}

export {FileUpload};