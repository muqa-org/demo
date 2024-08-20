import { RoundPhase } from '@muqa/db';

export interface RoundData {
	title: string;
	endDate: string;
	phases: RoundPhase[];
}
