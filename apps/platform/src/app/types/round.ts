import prisma from '@muqa/db';

export interface RoundData {
	title: string;
	endDate: string;
	phases: prisma.RoundPhase[];
}
