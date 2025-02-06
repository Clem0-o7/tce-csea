import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Admin() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until the session status is known
    if (status === 'loading') return;

    if (status === 'authenticated') {
      router.replace('/admin/dashboard');
    } else if (status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, router]);

  return <div>Loading...</div>;
}
