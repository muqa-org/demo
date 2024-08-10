import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const lang = url.searchParams.get('lang') || 'en';
	const langCookie = request.cookies.get('lang') ?? '';

	if (lang !== langCookie) {
		const response = NextResponse.next();
		response.cookies.set('lang', lang, { path: '/' });

		return response;
	}

	return NextResponse.next();
}
