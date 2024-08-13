import Container from '@/app/components/Container';
import Socials from '@/app/components/common/Socials';
import FooterLinks from '@/app/components/footer/FooterLinks';

export default function Footer() {
	return (
		<footer className='bg-[#F6F6F6] py-12'>
			<Container className='mx-auto flex flex-col items-center justify-between px-5 py-5 lg:flex-row'>
				<Socials />
				<FooterLinks />
			</Container>
		</footer>
	);
}
