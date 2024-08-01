import { RoundStatusBox } from '../RoundStatusBox';

export function HomepageRoundBoxes() {
	return (
		<div className='mx-auto flex w-full flex-col items-center justify-center xl:mx-48 xl:max-w-7xl 2xl:max-w-7xl'>
			<div className='mt-24 flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-5 shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)]'>
				<RoundStatusBox
					title='PRIJAVE'
					dateTime='25.7. - 6.8.2024. | 12:00 h'
					type='past'
				/>
				<RoundStatusBox
					title='DONIRANJE'
					dateTime='7.8. - 7.9.2024. | 12:00 h'
					type='current'
				/>
				<RoundStatusBox
					title='ZBRAJANJE GLASOVA'
					dateTime='8.9. - 13.9.2024. | 12:00 h'
					type='future'
				/>
				<RoundStatusBox
					title='REZULTATI'
					dateTime='15.9.2024. | 12:00 h'
					type='future'
				/>
			</div>
		</div>
	);
}
