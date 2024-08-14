import prisma from '../lib/db';
import seedRoundPhases from './seeds/round-phases';

async function seed() {
  await seedRoundPhases();
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
