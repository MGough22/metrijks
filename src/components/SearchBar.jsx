import { useState } from "react";
import { useLocation } from "react-router";
import { useSearchContext } from "../context/SearchContext";

export default function SearchBar() {
  const {
    setSearchTerm,
    searchSource,
    setSearchSource,
    setCollectionSearchTerm,
    collectionSearchTerm,
  } = useSearchContext();

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
    }
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={
          isOnExhibitionPage
            ? "Search your collection..."
            : "Search museum APIs..."
        }
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {!isOnExhibitionPage && (
        <div>
          <label>
            <input
              type="radio"
              value="met"
              checked={searchSource === "met"}
              onChange={e => setSearchSource(e.target.value)}
            />
            MET
          </label>

          <label>
            <input
              type="radio"
              value="rijks"
              checked={searchSource === "rijks"}
              onChange={e => setSearchSource(e.target.value)}
            />
            Rijksmuseum
          </label>
        </div>
      )}

      <button type="submit">Search</button>

      {isOnExhibitionPage && collectionSearchTerm && (
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      )}
    </form>
  );
}
