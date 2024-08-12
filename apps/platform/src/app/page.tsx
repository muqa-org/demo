import HomepageIntro from '@/app/components/homepage/HomepageIntro';
import HomepageRoundBoxes from '@/app/components/homepage/HomepageRoundBoxes';

export default function Home() {

	return (
		<div className='bg-[#F0F7FE] pb-36 pt-20'>
			<HomepageIntro />
			<HomepageRoundBoxes />
		</div>
	);
}
