import { HomepageExampleProject } from '@/app/components/homepage/HomepageExampleProject';
import { HomepageHero } from '@/app/components/homepage/HomepageHero';
import { HomepageIntro } from '@/app/components/homepage/HomepageIntro';
import { HomepageStats } from '@/app/components/homepage/HomepageStats';

export default function HomeGreen() {
	return (
		<>
			<HomepageHero />
			<HomepageExampleProject />
			<HomepageStats />
			<HomepageIntro />
		</>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
