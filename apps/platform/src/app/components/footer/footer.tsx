import { FooterLinks } from './FooterLinks';
import { Socials } from '../common/Socials';

export function Footer() {
	return (
		<footer className='bg-[#F6F6F6] py-12'>
			<div className='mx-auto flex items-center justify-between py-5 px-5 xl:max-w-7xl xl:px-0 2xl:max-w-7xl 2xl:px-0'>
				<Socials />
				<FooterLinks />
			</div>
		</footer>
	);
}
