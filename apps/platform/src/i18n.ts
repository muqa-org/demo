import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
	// Access the `lang` cookie
	const cookieStore = cookies();
	const locale = cookieStore.get('lang')?.value || 'en';

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
