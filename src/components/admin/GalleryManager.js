import { useState } from 'react';
import SearchBar from './SearchBar';

export default function GalleryManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([
    // Example data
    { id: 1, url: '/image1.jpg', description: 'Event 1' },
    { id: 2, url: '/image2.jpg', description: 'Event 2' },
  ]);

  const filteredGallery = gallery.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  return (
    <div>
      <SearchBar
        placeholder="Search gallery"
        onSearch={(query) => setSearchQuery(query)}
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredGallery.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.url}
              alt={item.description}
              className="w-full h-auto rounded shadow"
            />
            <p className="mt-2 text-sm">{item.description}</p>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
