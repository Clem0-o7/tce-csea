import { useState } from 'react';
import SearchBar from './SearchBar';

export default function MagazinesManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [magazines, setMagazines] = useState([
    // Example data
    { id: 1, name: 'Issue 1', link: '/magazine1.pdf' },
    { id: 2, name: 'Issue 2', link: '/magazine2.pdf' },
  ]);

  const filteredMagazines = magazines.filter((magazine) =>
    magazine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setMagazines(magazines.filter((magazine) => magazine.id !== id));
  };

  return (
    <div>
      <SearchBar
        placeholder="Search magazines"
        onSearch={(query) => setSearchQuery(query)}
      />
      <ul>
        {filteredMagazines.map((magazine) => (
          <li key={magazine.id} className="mb-4">
            <a
              href={magazine.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {magazine.name}
            </a>
            <button
              className="ml-4 text-red-500 hover:underline"
              onClick={() => handleDelete(magazine.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
