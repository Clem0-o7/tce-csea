import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = async () => {
    await signIn("credentials", { redirect: false, email: "test@example.com", password: "password123" });
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
