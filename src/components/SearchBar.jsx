import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";

export default function SearchBar() {
  const { setSearchTerm, searchSource, setSearchSource } = useSearchContext();
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length === 0) return;
    setSearchTerm(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for art..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

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

      <button type="submit">Search</button>
    </form>
  );
}
