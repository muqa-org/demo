import { RoundPhase } from '../RoundPhase';

export function HomepageRoundBoxes() {
	return (
		<div className='2xl:mx-34 mx-auto flex flex-col items-center justify-center px-9 md:flex-col xl:max-w-7xl xl:flex-row xl:px-0 2xl:max-w-7xl'>
			<div className='mt-24 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 pb-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)] lg:flex-row'>
				<RoundPhase
					title='PRIJAVE'
					startDate={new Date('2024-07-25T12:00:00')}
					endDate={new Date('2024-08-06T12:00:00')}
				/>
				<RoundPhase
					title='DONIRANJE'
					startDate={new Date('2024-08-07T12:00:00')}
					endDate={new Date('2024-09-07T12:00:00')}
				/>
				<RoundPhase
					title='ZBRAJANJE GLASOVA'
					startDate={new Date('2024-09-08T12:00:00')}
					endDate={new Date('2024-09-13T12:00:00')}
				/>
				<RoundPhase
					title='REZULTATI'
					startDate={new Date('2024-09-15T12:00:00')}
					endDate={new Date('2024-09-15T12:00:00')}
				/>
			</div>
		</div>
	);
}
