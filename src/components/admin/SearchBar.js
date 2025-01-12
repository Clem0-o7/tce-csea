export default function SearchBar({ placeholder, onSearch }) {
    return (
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l px-4 py-2"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={() => onSearch('')}
        >
          Clear
        </button>
      </div>
    );
  }
  