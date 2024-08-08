import { HomepageIntro } from './components/homepage/HomepageIntro';
import { HomepageRoundBoxes } from './components/homepage/HomepageRoundBoxes';

export default function Home() {
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
