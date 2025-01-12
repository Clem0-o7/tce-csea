import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.replace('/admin/login');
  }, [router]);

  return null; // Prevent rendering anything while redirecting
}
