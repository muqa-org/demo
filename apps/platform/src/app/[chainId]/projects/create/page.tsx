'use client';

import Container from '@/app/components/Container';
import { useFormState, useFormStatus } from 'react-dom';

import { createProjectAction } from './actions';
import { useTranslations } from 'next-intl';

import { neighborhoods } from '@/app/config';
import ProjectProposalFormButton from '@/app/components/project/ProjectProposalFormButton';

export default function CreateProjectPage() {
	const t = useTranslations('proposalForm');

	const [state, formAction] = useFormState(createProjectAction, {
		message: [],
		status: false,
	});

	if (state.status && state.message.includes('success')) {
		return (
			<div className='mb-10 mt-10 flex flex-col items-center justify-center'>
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
					{/* Display all error messages */}
					{!state.status && state.message.length > 0 && (
						<div className='mx-auto mt-4 max-w-2xl p-4 text-red-500'>
							<ul>
								{state.message.map((msg, idx) => (
									<li key={idx}>{msg}</li>
								))}
							</ul>
						</div>
					)}
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
							<div className='text-base italic text-grayDark'>
								{t('projectDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='disctrict'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('disctrictTitle')}
							</label>
							<select
								id='disctrict'
								name='disctrict'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
								required
							>
								{neighborhoods.map(neighborhood => (
									<option key={neighborhood} value={neighborhood}>
										{neighborhood}
									</option>
								))}
							</select>
							<div className='text-base italic text-grayDark'>
								{t('disctrictDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='street'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('streetTitle')}
							</label>
							<input
								type='text'
								id='street'
								name='street'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							<div className='text-base italic text-grayDark'>
								{t('streetDesc')}
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
							<div className='text-base italic text-grayDark'>
								{t('locationDesc1')}
								<div className='mt-3 block'>{t('locationDesc2')}</div>
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
							<div className='text-base italic text-grayDark'>
								{t('descriptionDesc1')}
								<div className='mt-3 block'>{t('descriptionDesc2')}</div>
								<div className='mt-3 block'>{t('descriptionDesc3')}</div>
								<div className='mt-3 block'>
									<ul className='list-disc pl-10'>
										<li>
											{t.rich('descriptionDesc4', {
												guidelines: chunks => <strong>{chunks}</strong>,
											})}
										</li>
										<li>
											{t.rich('descriptionDesc5', {
												guidelines: chunks => <strong>{chunks}</strong>,
											})}
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='mb-6'>
							<label
								htmlFor='proposer'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('fotoTitle')}
							</label>
							<input
								type='file'
								id='photo'
								name='photo'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block w-full rounded-md border p-2 shadow-sm'
							/>
							<div className='text-base italic text-grayDark'>
								{t('fotoDesc')}
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
								htmlFor='proposer'
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
							<div className='text-base italic text-grayDark'>
								{t('emailDesc')}
							</div>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='additional'
								className='block text-lg font-medium text-primaryBlack'
							>
								{t('additionalTitle')}
							</label>
							<textarea
								id='additional'
								name='additional'
								className='focus:border-indigo-500 border-grayLight mb-1 mt-1 block h-80 w-full rounded-md border p-2 shadow-sm'
							/>
							<div className='text-base italic text-grayDark'>
								{t('additionalDesc')}
							</div>
						</div>
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

// 'use client';

// import { CreateProject } from '@allo/kit';
// import { useRouter } from 'next/navigation';

// export default function CreateProjectPage() {
//   const router = useRouter();
//   return (
//     <section>
//       <CreateProject
//         onCreated={({ id, chainId }) => {
//           console.log('Project created', { id, chainId });
//           router.push(`/${chainId}/projects/${id}`);
//         }}
//       />
//     </section>
//   );
// }
