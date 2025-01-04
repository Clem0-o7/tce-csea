import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = document.cookie.includes('adminLoggedIn=true');
    if (!isLoggedIn) {
      router.replace('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Remove login cookie
    document.cookie = 'adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="magazines">Magazines</TabsTrigger>
            <TabsTrigger value="officeBearers">Office Bearers</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            Events Management
          </TabsContent>
          <TabsContent value="gallery">
            Gallery Management
          </TabsContent>
          <TabsContent value="magazines">
            Magazines Management
          </TabsContent>
          <TabsContent value="officeBearers">
            Office Bearers Management
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}