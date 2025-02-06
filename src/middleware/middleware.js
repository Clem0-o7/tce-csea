import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow login page and any public resources (like JSON or other non-protected APIs)
    if (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname.endsWith('.json')) {
      return NextResponse.next();
    }

    const token = req.nextauth.token;

    // If the token doesn't exist and the user tries to access a protected route, redirect to login
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always authorize the login page
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        // Otherwise, return true if there is a token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
