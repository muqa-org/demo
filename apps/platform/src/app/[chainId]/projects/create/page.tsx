'use client';

import Container from '@/app/components/Container';

export default function CreateProjectPage() {
	return (
		<section className='py-4'>
			<Container className='mx-auto mb-6 flex justify-between gap-10 px-5 py-5'>
				<div className='flex h-full w-full flex-col flex-wrap justify-between'>
					<h1 className='w-full border-b border-borderGrayLight pb-10 pt-10 text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl'>
						Predložite projekt
					</h1>
				</div>
        <div>
          
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
