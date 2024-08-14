import { useTranslations } from 'next-intl';

import RoundPhase from '@/app/components/RoundPhase';
import prisma from '@muqa/db';

export default async function HomepageRoundBoxes() {
	const t = useTranslations('round');

	const phases = await prisma.roundPhase.findMany({
		orderBy: {
			startDate: 'asc',
		},
	});

	return (
			<div className='mt-10 flex w-full flex-col items-center justify-center gap-2 p-5 pb-1.5 lg:flex-row'>
				{phases.map((phase) => (
					<RoundPhase
						key={phase.id}
						title={t(`round${phase.title}`)}
						startDate={new Date(phase.startDate)}
						endDate={new Date(phase.endDate)}
					/>
				))}
			</div>
	);
}
