//@/middleware/middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow login page, Next.js data requests, and API auth requests
    if (pathname === '/admin/login' || pathname.endsWith('.json') || pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    const token = req.nextauth.token;

    // Redirect to login if token is missing
    if (pathname.startsWith('/admin') && !token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === '/admin/login') return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'], // Allow NextAuth APIs
};
