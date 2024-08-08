import { RoundPhase } from '../RoundPhase';

export default function ProjectsSidebarPhases({ round }) {
	return (
		<div className='mt-6'>
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
	);
}
