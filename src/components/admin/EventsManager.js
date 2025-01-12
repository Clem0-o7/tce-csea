import { useState } from 'react';
import SearchBar from './SearchBar';

export default function EventsManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
    // Example data
    { id: 1, name: 'Tech Talk', date: '2024-12-01', description: 'A talk on AI' },
    { id: 2, name: 'Hackathon', date: '2024-12-15', description: 'Coding challenge' },
  ]);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div>
      <SearchBar
        placeholder="Search events"
        onSearch={(query) => setSearchQuery(query)}
      />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{event.name}</td>
              <td className="px-4 py-2">{event.date}</td>
              <td className="px-4 py-2">{event.description}</td>
              <td className="px-4 py-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
