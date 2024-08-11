import HomepageEligibleProjects from '@/app/components/homepage/HomepageEligibleProjects';
import HomepageExampleProject from '@/app/components/homepage/HomepageExampleProject';
import HomepageFoundsAllocated from '@/app/components/homepage/HomepageFoundsAllocated';
import HomepageHero from '@/app/components/homepage/HomepageHero';
import HomepageIntro from '@/app/components/homepage/HomepageIntro';
import HomepageStats from '@/app/components/homepage/HomepageStats';
import HomepageFAQ from '@/app/components/homepage/HomepageFAQ';
import HomepageBanner from '@/app/components/homepage/HomepageBanner';

export default function HomeGreen() {
	return (
		<>
			<HomepageHero />
			<HomepageExampleProject />
			<HomepageStats />
			<HomepageIntro />
			<HomepageEligibleProjects />
			<HomepageFoundsAllocated />
			<HomepageFAQ />
			<HomepageBanner />
		</>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
