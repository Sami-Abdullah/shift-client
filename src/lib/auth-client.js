import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
  plugins: [adminClient(), emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;