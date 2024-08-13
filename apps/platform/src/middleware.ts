import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Skip middleware for static assets served from /_next/, /static/, or /public/
	if (
		pathname.startsWith('/_next/') ||
		pathname.startsWith('/static/') ||
		pathname.startsWith('/public/')
	) {
		return NextResponse.next();
	}

	// Additional check for common static file extensions if necessary
	const staticFileRegex =
		/\.(ico|png|jpg|jpeg|gif|webp|css|js|map|svg|woff|woff2|ttf|eot|pdf|doc|docx|xls|xlsx|ppt|pptx)$/i;
	if (staticFileRegex.test(pathname)) {
		return NextResponse.next();
	}

	const lang = url.searchParams.get('lang') || 'en';
	const langCookie: { value?: string } = request.cookies.get('lang') ?? {};

	if (lang !== langCookie?.value) {
		const response = NextResponse.next();
		response.cookies.set('lang', lang, { path: '/' });

		return response;
	}

	return NextResponse.next();
}
