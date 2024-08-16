import prisma from '@muqa/db';
import { useTranslations } from 'next-intl';

import RoundPhase from '@/app/components/RoundPhase';

export default function ProjectsSidebarPhases({
	phases,
}: {
	phases: prisma.RoundPhase[];
}) {
	const t = useTranslations('round');

	return (
		<>
			{phases.map(phase => (
				<RoundPhase
					key={phase.id}
					title={t(`round${phase.title}`)}
					startDate={new Date(phase.startDate)}
					endDate={new Date(phase.endDate)}
				/>
			))}
		</>
	);
}
