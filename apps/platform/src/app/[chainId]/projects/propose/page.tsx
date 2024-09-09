'use client';

import Container from '@/app/components/Container';
import { useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { createProjectAction } from './actions';

import ProjectProposalFormButton from '@/app/components/project/ProjectProposalFormButton';

type FileWithPreview = {
	file: File;
	url: string;
};

type MessageType = {
	key: string;
	notice: string;
};

const getErrorMessage = (
	messages: MessageType[] | string[],
	key: string,
): string | null => {
	const message = (messages as MessageType[]).find(msg => msg.key === key);
	return message ? message.notice : null;
};

export default function CreateProjectPage() {
	const t = useTranslations('proposalForm');

	const [state, formAction] = useFormState(createProjectAction, {
		message: [],
		status: false,
	});

	const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files: File[] = event.target.files
			? Array.from(event.target.files)
			: [];

		// Map through files and create a preview URL for each file
		const filePreviews: FileWithPreview[] = files.map(file => ({
			file,
			url: URL.createObjectURL(file),
		}));

		setSelectedFiles(prevFiles => [...prevFiles, ...filePreviews]);
	};

	const handleButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const removeFile = (index: number) => {
		const updatedFiles = selectedFiles.filter((_, i) => i !== index);
		setSelectedFiles(updatedFiles);

		// Create a new FileList based on updatedFiles
		const dataTransfer = new DataTransfer();
		updatedFiles.forEach(filePreview => {
			dataTransfer.items.add(filePreview.file);
		});

		// Update the inputRef to reflect the new FileList
		if (inputRef.current) {
			inputRef.current.files = dataTransfer.files;
		}
	};

	const handleSubmit = (formData: FormData) => {
		selectedFiles.forEach(({ file }) => {
			formData.append('photo', file);
		});
	};

	if (state.status && getErrorMessage(state.message, 'success')) {
		return (
			<div className='mb-10 mt-10 flex h-[calc(100vh-395px)] flex-col items-center justify-center'>
				<h1 className='mb-6 text-center text-2xl font-bold'>{t('success')}</h1>
				<p className='text-center text-lg'>{t('successDesc')}</p>
			</div>
		);
	}

	return (
		<section className='py-4'>
			<Container className='mx-auto mb-6 flex flex-wrap justify-between gap-10 px-5 py-5'>
				<div className='flex h-full w-full flex-col flex-wrap justify-between'>
					<h1 className='w-full border-b border-borderGrayLight pb-10 pt-10 text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl'>
						{t('title')}
					</h1>
				</div>
				<div className='w-full'>
					<div className='mx-auto max-w-2xl p-4 text-lg text-grayDark'>
						{t('description')}
					</div>
					<form action={formAction} className='mx-auto max-w-2xl p-4'>
						<div className='mb-6'>
							<label
								htmlFor='project'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('projectTitle')}
							</label>
							<input
								type='text'
								id='project'
								name='project'
								className='focus:border-indigo-500 border-grayLight mb-2 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'project') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'project')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('projectDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='location'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('locationTitle')}
							</label>
							<textarea
								id='location'
								name='location'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block h-80 w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'location') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'location')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('locationDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='description'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('descriptionTitle')}
							</label>
							<textarea
								id='description'
								name='description'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block h-96 w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'description') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'description')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('descriptionDesc')}
							</div>
						</div>

						<div className='mb-10'>
							<label
								htmlFor='photo'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('fotoTitle')}
							</label>
							<input
								type='file'
								id='photo'
								name='photo'
								multiple
								ref={inputRef}
								onChange={handleFileChange}
								accept='image/png, image/gif, image/jpeg, image/webp'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 hidden w-full rounded-md border p-2 shadow-sm'
							/>
							<button
								type='button'
								onClick={handleButtonClick}
								className='my-2 rounded-lg bg-green px-4 py-2 text-white hover:opacity-70'
							>
								{t('fotoButton')}
							</button>

							{selectedFiles.length > 0 && (
								<div className='mb-5 mt-4 flex flex-wrap gap-4'>
									{selectedFiles.map((fileData, index) => (
										<div
											key={index}
											className='border-gray-300 group relative h-32 w-32 rounded border-borderGreen'
										>
											<img
												src={fileData.url}
												alt={`preview-${index}`}
												className='h-full w-full rounded object-cover'
											/>
											{/* "X" button */}
											<button
												onClick={() => removeFile(index)}
												className='absolute right-[-10px] top-[-10px] h-6 w-6 rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'
											>
												X
											</button>
										</div>
									))}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('fotoDesc')}
							</div>
						</div>

						<div className='mb-8 h-1 w-full border-t border-borderGray'></div>

						<div className='mb-6'>
							<label
								htmlFor='name'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('nameTitle')}
							</label>
							<input
								type='text'
								id='name'
								name='name'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'name') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'name')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('nameDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='proposer'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('proposerTitle')}
							</label>
							<input
								type='text'
								id='proposer'
								name='proposer'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							<div className='text-base italic text-grayDark'>
								{t('proposerDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='publish'
								className='block cursor-pointer text-lg font-medium text-primaryBlack'
							>
								<input
									type='checkbox'
									id='publish'
									name='publish'
									className='mr-3'
								/>
								{t('publishTitle')}
							</label>
							<div className='text-base italic text-grayDark'>
								{t('publishDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='email'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('emailTitle')}
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'email') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'email')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('emailDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='mobile'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('mobileTitle')}
							</label>
							<input
								type='text'
								id='mobile'
								name='mobile'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							{getErrorMessage(state.message, 'mobile') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'mobile')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t('mobileDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label className='mb-2 block text-lg font-medium text-primaryBlack'>
								{t('futherTitle')}
							</label>
							<div className='mb-4 flex items-center'>
								<input
									id='option-yes'
									name='futher'
									type='radio'
									value={t('futherYes')}
									className='border-grayLight h-4 w-4 text-green-600 focus:ring-green-500'
								/>
								<label htmlFor='option-yes' className='ml-3 block text-base'>
									{t('futherYes')}
								</label>
							</div>
							<div className='flex items-center'>
								<input
									id='option-no'
									name='futher'
									type='radio'
									value={t('futherNo')}
									className='border-grayLight h-4 w-4 text-green-600 focus:ring-green-500'
								/>
								<label htmlFor='option-no' className='ml-3 block text-base'>
									{t('futherNo')}
								</label>
							</div>
							{getErrorMessage(state.message, 'futher') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'futher')}
								</div>
							)}
							<div className='mt-3 text-base italic text-grayDark'>
								{t('futherDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='terms'
								className='block cursor-pointer text-lg font-medium text-primaryBlack'
							>
								<input
									type='checkbox'
									id='terms'
									name='terms'
									className='mr-3'
								/>
								{t('termsTitle')}
							</label>
							{getErrorMessage(state.message, 'terms') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'terms')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t.rich('termsDesc', {
									guidelines: chunks => (
										<a
											href='/terms'
											target='_blank'
											className='text-green hover:opacity-70'
										>
											{chunks}
										</a>
									),
								})}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='privacy'
								className='block cursor-pointer text-lg font-medium text-primaryBlack'
							>
								<input
									type='checkbox'
									id='privacy'
									name='privacy'
									className='mr-3'
								/>
								{t('privacyTitle')}
							</label>
							{getErrorMessage(state.message, 'privacy') && (
								<div className='mx-auto mt-1 max-w-2xl text-red-500'>
									{getErrorMessage(state.message, 'privacy')}
								</div>
							)}
							<div className='text-base italic text-grayDark'>
								{t.rich('privacyDesc', {
									guidelines: chunks => (
										<a
											href='/privacy'
											target='_blank'
											className='text-green hover:opacity-70'
										>
											{chunks}
										</a>
									),
								})}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='allow'
								className='block cursor-pointer text-lg font-medium text-primaryBlack'
							>
								<input
									type='checkbox'
									id='allow'
									name='allow'
									className='mr-3'
								/>
								{t('allowTitle')}
							</label>
						</div>
						{getErrorMessage(state.message, 'allow') && (
							<div className='mx-auto mt-1 max-w-2xl text-red-500'>
								{getErrorMessage(state.message, 'allow')}
							</div>
						)}
						<div className='mb-6'>
							<div className='text-base italic text-grayDark'>
								{t.rich('formFooterDesc1', {
									guidelines: chunks => <strong>{chunks}</strong>,
								})}
								<div className='mt-3 block'>{t('formFooterDesc2')}</div>
								<div className='mt-3 block'>{t('formFooterDesc3')}</div>
							</div>
						</div>
						<ProjectProposalFormButton />
						{!state.status && state.message.length > 0 && (
							<div className='mt-3 block rounded-lg bg-red-500 p-4 text-white'>
								{t('notification')}
							</div>
						)}
					</form>
				</div>
			</Container>
		</section>
	);
}
