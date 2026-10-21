import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail || !token?.email) {
          return false;
        }
        return token.email.toLowerCase() === adminEmail.toLowerCase();
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
