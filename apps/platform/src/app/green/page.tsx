import { HomepageIntro } from '@/app/components/homepage/HomepageIntro';
import { HomepageRoundBoxes } from '@/app/components/homepage/HomepageRoundBoxes';

export default function HomeGreen() {
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
