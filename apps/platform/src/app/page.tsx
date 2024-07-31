import { HomepageIntro } from './components/homepage/HomepageIntro';
import { HomepageRoundBoxes } from './components/homepage/HomepageRoundBoxes';

export default function Home() {
	return (
		<section className='flex flex-col bg-[#F0F7FE] pt-20 pb-36'>
			<HomepageIntro />
			<HomepageRoundBoxes />
		</section>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
