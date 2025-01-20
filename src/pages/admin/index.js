import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Admin() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/dashboard');
    } else if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  return <div>Loading...</div>;
}