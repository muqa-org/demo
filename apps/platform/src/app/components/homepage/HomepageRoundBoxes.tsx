import { useTranslations } from 'next-intl';

import { RoundPhase } from '../RoundPhase';

export function HomepageRoundBoxes() {
	const t = useTranslations('round');

	return (
		<div className='mt-10 flex w-full flex-col items-center justify-center gap-2 p-5 pb-1.5 lg:flex-row'>
			<RoundPhase
				title={t('roundApplication')}
				startDate={new Date('2024-07-25T12:00:00')}
				endDate={new Date('2024-08-06T12:00:00')}
			/>
			<RoundPhase
				title={t('roundDonation')}
				startDate={new Date('2024-08-07T12:00:00')}
				endDate={new Date('2024-09-07T12:00:00')}
			/>
			<RoundPhase
				title={t('roundVotes')}
				startDate={new Date('2024-09-08T12:00:00')}
				endDate={new Date('2024-09-13T12:00:00')}
			/>
			<RoundPhase
				title={t('roundResults')}
				startDate={new Date('2024-09-15T12:00:00')}
				endDate={new Date('2024-09-15T12:00:00')}
			/>
		</div>
	);
}
