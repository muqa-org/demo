import { getLocale } from 'next-intl/server';

import HomepageEligibleProjects from '@/app/components/homepage/HomepageEligibleProjects';
import HomepageExampleProject from '@/app/components/homepage/HomepageExampleProject';
import HomepageFundsAllocated from '@/app/components/homepage/HomepageFundsAllocated';
import HomepageHero from '@/app/components/homepage/HomepageHero';
import HomepageIntro from '@/app/components/homepage/HomepageIntro';
import HomepageStats from '@/app/components/homepage/HomepageStats';
import HomepageFAQ from '@/app/components/homepage/HomepageFAQ';
import HomepageBanner from '@/app/components/homepage/HomepageBanner';
import HomepageAbout from '@/app/components/homepage/HomepageAbout';

export default async function HomeGreen() {
	const locale = await getLocale();

	return (
		<>
			<HomepageHero locale={locale} />
			<HomepageExampleProject />
			<HomepageStats />
			<HomepageIntro />
			<HomepageEligibleProjects />
			<HomepageFundsAllocated />
			<HomepageFAQ />
			<HomepageBanner />
			<HomepageAbout />
		</>
	);
}
