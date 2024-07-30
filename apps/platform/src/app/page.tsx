import { Share_Tech_Mono } from 'next/font/google';

const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'] });

export default function Home() {
	return (
		<section className='bg-[#F0F7FE] py-20'>
			<div className='${shareTechMono.className} mx-auto flex h-[54vh] max-w-7xl flex-col items-center justify-center px-48'>
				<h1
					className={`${shareTechMono.className} mb-7 text-center text-5xl font-normal uppercase text-primary`}
				>
					Sudjeluj u prvom kvadratnom financiranju grada splita
				</h1>
				<div className='text-center text-xl font-normal text-gray'>
					This round is open to people from Split. Connect your wallet
					to verify your eligibility and generate a key.
				</div>
			</div>
		</section>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
