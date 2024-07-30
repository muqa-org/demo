import { FooterLinks } from './FooterLinks';
import { Socials } from '../common/Socials';

export function Footer() {
	return (
		<footer className='bg-[#F6F6F6] py-12'>
			<div className='py-5 max-w-7xl mx-auto flex items-center justify-between'>
				<Socials />
				<FooterLinks />
			</div>
		</footer>
	);
}
