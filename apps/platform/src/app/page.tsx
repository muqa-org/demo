import { HomepageIntro } from './components/homepage/HomepageIntro';
import { HomepageRoundBoxes } from './components/homepage/HomepageRoundBoxes';

import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations();

	return (
		<div className='bg-[#F0F7FE] pb-36 pt-20'>
			<HomepageIntro />
			<HomepageRoundBoxes />
		</div>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
