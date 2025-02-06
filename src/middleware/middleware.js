//@/middleware/middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow access to login page without token
      if (req.nextUrl.pathname === '/admin/login') return true;
      // Require token for all other admin routes
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'], // Allow NextAuth APIs
};
