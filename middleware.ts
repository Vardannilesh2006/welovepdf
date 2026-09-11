import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const canonicalHost = 'www.welovepdf.best';

  // If request hits any *.vercel.app domain, apex domain, or preview deployment
  if (host.includes('vercel.app') || host === 'welovepdf.best') {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = 'https:';
    url.port = '';

    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public static assets (.svg, .png, .jpg, .jpeg, .webp, .txt)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt)$).*)',
  ],
};
