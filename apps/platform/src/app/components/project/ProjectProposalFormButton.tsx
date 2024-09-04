'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

const ProjectProposalFormButton = () => {
	const t = useTranslations('proposalForm');
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			disabled={pending}
			className='rounded-xl bg-green px-10 py-3 text-base font-normal text-white hover:opacity-85'
		>
			{pending ? t('buttonSubmitting') : t('buttonName')}
		</button>
	);
};

export default ProjectProposalFormButton;
