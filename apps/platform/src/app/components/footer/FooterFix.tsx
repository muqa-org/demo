import { FooterLinks } from './FooterLinks';
import { Socials } from '../common/Socials';

export default function Footer() {
	return (
		<footer className='bg-[#F6F6F6] py-12'>
			<div className='mx-auto flex flex-col items-center justify-between px-5 py-5 lg:flex-row xl:max-w-7xl xl:px-0 2xl:max-w-[1440px] 2xl:px-0'>
				<Socials />
				<FooterLinks />
			</div>
		</footer>
	);
}
