'use client';

import Container from '@/app/components/Container';
import { useFormState, useFormStatus } from 'react-dom';

import { createProjectAction } from './actions';

export default function CreateProjectPage() {
	const [state, formAction] = useFormState(createProjectAction, {
		message: '',
		status: '',
	});
	const { pending } = useFormStatus();

	return (
		<section className='py-4'>
			<Container className='mx-auto mb-6 flex flex-wrap justify-between gap-10 px-5 py-5'>
				<div className='flex h-full w-full flex-col flex-wrap justify-between'>
					<h1 className='w-full border-b border-borderGrayLight pb-10 pt-10 text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl'>
						Predložite projekt
					</h1>
				</div>
				<div className='w-full'>
					<form action={formAction} className='mx-auto max-w-lg space-y-6 p-4'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='border-gray-300 focus:border-indigo-500 mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='title'
								className='block text-sm font-medium text-gray-700'
							>
								Title
							</label>
							<input
								type='text'
								id='title'
								name='title'
								className='border-gray-300 focus:border-indigo-500 mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm'
								required
							/>
						</div>
						<div>
							<label
								htmlFor='description'
								className='block text-sm font-medium text-gray-700'
							>
								Description
							</label>
							<textarea
								id='description'
								name='description'
								className='border-gray-300 focus:border-indigo-500 mt-1 block w-full rounded-md border p-2 shadow-sm focus:ring-indigo-500 sm:text-sm'
								required
							/>
						</div>
						<button
							type='submit'
							className='border-transparent inline-flex justify-center rounded-md border bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							{pending ? 'Submitting...' : 'Submit'}
						</button>
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
