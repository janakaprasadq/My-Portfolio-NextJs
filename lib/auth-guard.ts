import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * Validates that the active session belongs to the designated administrator.
 * Throws an Error if unauthenticated or unauthorized.
 */
export async function assertAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized: Authentication required.");
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || session.user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    throw new Error("Forbidden: Administrative privilege required.");
  }

  return session;
}
