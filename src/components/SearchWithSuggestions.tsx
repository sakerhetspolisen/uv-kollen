"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";

// Sample cities; replace or fetch dynamically
const allCities: [string, string, string][] = [
  ["Stockholm", "Stockholm, Stockholm", "stockholm"],
  ["Stockholm", "Stockholm, Stockholm", "stockholm2"],
  ["Stockholm", "Stockholm, Stockholm", "stockholm3"],
  ["Göteborg", "Göteborg, Västra Götaland", "göteborg"],
  ["Malmö", "Malmö, Skåne", "malmö"],
];

export default function SearchWithSuggestions() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<[string, string, string][]>([
    ["Stockholm", "Stockholm, Stockholm", "stockholm"],
    ["Göteborg", "Göteborg, Västra Götaland", "göteborg"],
    ["Malmö", "Malmö, Skåne", "malmö"],
  ]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter as user types
  useEffect(() => {
    if (query.trim()) {
      setSuggestions(
        allCities.filter((city) =>
          city[0].toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: string) => {
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length) {
      handleSelect(suggestions[0][2]);
    } else if (query.trim()) {
      handleSelect(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto font-sans">
      <div className="relative" ref={wrapperRef}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>

        {/* input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          placeholder="Börja skriva en stad..."
          className="block tracking-tight w-full pl-10 pr-28 py-4 text-lg text-neutral-dark bg-neutral-light border border-neutral focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-300 rounded-lg focus:rounded-b-none transition placeholder-earth-300"
        />

        {/* submit button */}
        <button
          type="submit"
          className="text-white font-semibold cursor-pointer text-lg absolute end-2.5 bottom-[9px] bg-neutral-800 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-300 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Beräkna
        </button>

        {/* suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-neutral-light border border-neutral rounded-b-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, idx) => (
              <li
                key={suggestion[2]}
                onClick={() => handleSelect(suggestion[2])}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`flex items-center px-4 py-1 lg:py-2 cursor-pointer ${
                  activeIndex === idx ? "bg-neutral-300" : ""
                }`}
              >
                <FaLocationDot className="w-5 h-5 text-neutral-900 mr-4" />
                <div className="flex flex-col items-start justify-start py-2">
                  <span className="text-xl font-serif font-semibold whitespace-nowrap leading-5 tracking-tighter text-neutral-dark">
                    {suggestion[0]}
                  </span>
                  <span className="text-md text-neutral-dark">
                    {suggestion[1]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

const SearchIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>
);
