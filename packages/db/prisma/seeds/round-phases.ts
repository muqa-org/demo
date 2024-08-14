import prisma from '../../lib/db';

const roundPhases = [
  {
    title: 'Application',
    startDate: new Date('2024-07-25T12:00:00'),
    endDate: new Date('2024-08-06T12:00:00'),
  },
  {
    title: 'Donation',
    startDate: new Date('2024-08-07T12:00:00'),
    endDate: new Date('2024-09-07T12:00:00'),
  },
  {
    title: 'Votes',
    startDate: new Date('2024-09-08T12:00:00'),
    endDate: new Date('2024-09-13T12:00:00'),
  },
  {
    title: 'Results',
    startDate: new Date('2024-09-15T12:00:00'),
    endDate: new Date('2024-09-15T12:00:00'),
  },
];

export default async function seedRoundPhases() {
  for (const phase of roundPhases) {
    await prisma.roundPhase.create({
      data: phase,
    });
  }
}
