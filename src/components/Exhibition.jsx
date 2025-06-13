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
    return (
      <p className="text-center mt-12 text-gray-500">
        Your exhibition is currently empty.
      </p>
    );
  }

  if (filteredAndSorted.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">
        No artworks match your current search.
      </p>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <FilterPanel
        selectedSort={sortOrder}
        onSortChange={setSortOrder}
        selectedSource={sourceFilter}
        onSourceFilterChange={setSourceFilter}
        enableSourceFilter={true}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSorted.map((item, index) => (
          <div
            className="bg-white rounded-lg overflow-hidden transition-transform transform hover:scale-[1.02] duration-200 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
            key={`${item.source}-${item.id}`}
          >
            <Link to={`/artworks/${item.source}/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <p className="font-medium text-sm truncate">{item.title}</p>
              </div>
            </Link>
            <div className="px-2 pb-3">
              <button
                onClick={() => removeFromCollection(item.id, item.source)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {collectionSearchTerm && (
        <p className="text-sm text-gray-600 italic text-center mx-auto">
          Showing results for:{" "}
          <span className="font-medium">{collectionSearchTerm}</span>
        </p>
      )}
    </div>
  );
};
