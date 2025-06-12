import { useCollection } from "../hooks/useCollection";
import { useSearchContext } from "../context/SearchContext";
import { Link } from "react-router";
import { useState, useMemo } from "react";
import FilterPanel from "../components/FilterPanel";

export const Exhibition = () => {
  const { collection, removeFromCollection } = useCollection();
  const { collectionSearchTerm } = useSearchContext();
  const [sortOrder, setSortOrder] = useState("relevance");
  const [sourceFilter, setSourceFilter] = useState("");

  const filteredAndSorted = useMemo(() => {
    let filtered = [...collection];

    if (collectionSearchTerm.trim()) {
      const lowerSearch = collectionSearchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowerSearch)
      );
    }

    if (sourceFilter) {
      filtered = filtered.filter(item => item.source === sourceFilter);
    }

    if (sortOrder === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [collection, collectionSearchTerm, sourceFilter, sortOrder]);

  if (collection.length === 0) {
    return <p>Your exhibition is currently empty.</p>;
  }

  if (filteredAndSorted.length === 0) {
    return <p>No artworks match your current search.</p>;
  }

  return (
    <div className="exhibition-container">
      <FilterPanel
        selectedSort={sortOrder}
        onSortChange={setSortOrder}
        selectedSource={sourceFilter}
        onSourceFilterChange={setSourceFilter}
        enableSourceFilter={true}
      />

      <div className="exhibition-gallery">
        {filteredAndSorted.map(item => (
          <div className="exhibition-item" key={`${item.source}-${item.id}`}>
            <Link to={`/artworks/${item.source}/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </Link>
            <button onClick={() => removeFromCollection(item.id, item.source)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
