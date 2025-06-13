import { useState } from "react";
import { useLocation } from "react-router";
import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const {
    setSearchTerm,
    searchSource,
    setSearchSource,
    setCollectionSearchTerm,
    collectionSearchTerm,
  } = useSearchContext();

  const navigate = useNavigate();

  const location = useLocation();
  const isOnExhibitionPage = location.pathname === "/exhibition";

  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (isOnExhibitionPage) {
      setCollectionSearchTerm(trimmed);
    } else {
      setSearchTerm(trimmed);
      if (location.pathname !== "/") {
        navigate("/");
      }
    }

    setQuery("");
  };

  const handleReset = () => {
    setQuery("");
    if (isOnExhibitionPage) {
      setCollectionSearchTerm("");
    } else {
      setSearchTerm("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row items-center gap-4 p-4"
    >
      <input
        type="text"
        placeholder={
          isOnExhibitionPage
            ? "Search your collection..."
            : "Search museum APIs..."
        }
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {!isOnExhibitionPage && (
        <div className="flex gap-2 items-center">
          {[
            { label: "MET", value: "met" },
            { label: "Rijks", value: "rijks" },
          ].map(opt => {
            const isActive = searchSource === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSearchSource(opt.value)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 focus:outline-none
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
      >
        Search
      </button>

      {isOnExhibitionPage && collectionSearchTerm && (
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
        >
          Reset
        </button>
      )}
    </form>
  );
}
