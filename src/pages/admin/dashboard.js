import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventsManager from '@/components/admin/EventsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import MagazinesManager from '@/components/admin/MagazinesManager';
import OfficeBearersManager from '@/components/admin/OfficeBearersManager';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.replace('/admin/login');
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="magazines">Magazines</TabsTrigger>
            <TabsTrigger value="officeBearers">Office Bearers</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
          <TabsContent value="magazines">
            <MagazinesManager />
          </TabsContent>
          <TabsContent value="officeBearers">
            <OfficeBearersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
