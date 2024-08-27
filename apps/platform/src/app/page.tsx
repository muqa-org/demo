import { getRoundPhases } from '@muqa/db';
import { getLocale } from 'next-intl/server';

import HomepageAbout from '@/app/components/homepage/HomepageAbout';
import HomepageBanner from '@/app/components/homepage/HomepageBanner';
import HomepageEligibleProjects from '@/app/components/homepage/HomepageEligibleProjects';
import HomepageExampleProject from '@/app/components/homepage/HomepageExampleProject';
import HomepageFAQ from '@/app/components/homepage/HomepageFAQ';
import HomepageFundsAllocated from '@/app/components/homepage/HomepageFundsAllocated';
import HomepageHero from '@/app/components/homepage/HomepageHero';
import HomepageIntro from '@/app/components/homepage/HomepageIntro';
import HomepageStats from '@/app/components/homepage/HomepageStats';

export default async function HomeGreen() {
	const locale = await getLocale();

	const phases = await getRoundPhases();

	return (
		<>
			<HomepageHero locale={locale} />
			<HomepageExampleProject />
			<HomepageStats />
			<HomepageIntro phases={phases} />
			<HomepageEligibleProjects />
			<HomepageFundsAllocated />
			<HomepageFAQ />
			<HomepageBanner />
			<HomepageAbout />
		</>
	);
}
