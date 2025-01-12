import { useState } from 'react';
import SearchBar from './SearchBar';

export default function OfficeBearersManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bearers, setBearers] = useState([
    // Example data
    { id: 1, name: 'John Doe', position: 'President', contact: 'john@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Vice President', contact: 'jane@example.com' },
  ]);

  const filteredBearers = bearers.filter((bearer) =>
    bearer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar
        placeholder="Search office bearers"
        onSearch={(query) => setSearchQuery(query)}
      />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {filteredBearers.map((bearer) => (
            <tr key={bearer.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{bearer.name}</td>
              <td className="px-4 py-2">{bearer.position}</td>
              <td className="px-4 py-2">{bearer.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
