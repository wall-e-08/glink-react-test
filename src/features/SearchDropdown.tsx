import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

type Item = {
  id: string;
  label: string;
};

type Props = {
  data: Item[];
  onSelect?: (item: Item) => void;
};

// todo: search by doctor's name
export function SearchDropdown({ data, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data.slice(0, 10);
    const s = search.toLowerCase();
    return data
      .filter((item) => item.id.toLowerCase().includes(s) || item.label.toLowerCase().includes(s))
      .slice(0, 10);
  }, [search, data]);

  const handleSelect = (item: Item) => {
    setSearch(item.label);
    setShowDropdown(false);
    onSelect?.(item);
  };

  return (
    <div className="relative w-full flex items-center flex-1">
      <div className="flex items-center flex-1 relative">
        <Search className="absolute left-2 pointer-events-none text-gray-500" size={18} />
        <input
          type="text"
          className={clsx(
            "pl-10 py-1 w-full",
            "text-black border border-secondary rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          placeholder="Search"
          value={search}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showDropdown && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border border-gray-300 bg-white rounded-md shadow-lg">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              >
                {item.label} <span className="text-gray-400 text-xs">({item.id})</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400 text-sm">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
export default SearchDropdown;