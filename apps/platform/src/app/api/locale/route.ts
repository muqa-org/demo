import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const response = NextResponse.json({}, { status: 200 });
	const { lang } = await request.json();
	const cookieLang = request.cookies.get('lang')?.value;

	if (lang !== cookieLang) {
		response.cookies.set('lang', lang, {
			path: '/',
			maxAge: 6 * 30 * 24 * 60 * 60,
		}); // 6 months
	}

	return response;
}
