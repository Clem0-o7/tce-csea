import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addEvent, getAllEvents, updateEvent, deleteEvent } from '@/db/queries/events';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    status: 'upcoming',
    registrationLink: '',
    teamSizeMin: 1,
    teamSizeMax: 10
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const fetchedEvents = await getAllEvents();
    setEvents(fetchedEvents);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert Google Drive link to direct download link
    const directLink = convertGoogleDriveLink(newEvent.registrationLink);
    
    await addEvent({
      ...newEvent,
      registrationLink: directLink
    });
    
    fetchEvents();
    // Reset form
    setNewEvent({
      name: '',
      description: '',
      date: '',
      status: 'upcoming',
      registrationLink: '',
      teamSizeMin: 1,
      teamSizeMax: 10
    });
  };

  const convertGoogleDriveLink = (link) => {
    if (link.includes('drive.google.com/file/d/')) {
      const fileId = link.match(/\/d\/([^/]+)/)[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return link;
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="description"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
            <Input
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
            <Select
              name="status"
              value={newEvent.status}
              onValueChange={(value) => setNewEvent(prev => ({
                ...prev,
                status: value
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Event Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="registrationLink"
              placeholder="Registration Link (Google Drive)"
              value={newEvent.registrationLink}
              onChange={handleInputChange}
            />
            <div className="flex space-x-2">
              <Input
                name="teamSizeMin"
                type="number"
                placeholder="Min Team Size"
                value={newEvent.teamSizeMin}
                onChange={handleInputChange}
              />
              <Input
                name="teamSizeMax"
                type="number"
                placeholder="Max Team Size"
                value={newEvent.teamSizeMax}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Create Event</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>
                {/* Add edit and delete actions */}
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}