import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { getMetSearchResults } from "../apis/met";
import { getRijksSearchResults } from "../apis/rijks";
import { useSearchContext } from "../context/SearchContext";
import FilterPanel from "../components/FilterPanel";
import ArtworkCard from "./ArtworkCard";
import { hatch } from "ldrs";

hatch.register();

export default function ArtworkList() {
  const { searchTerm, searchSource } = useSearchContext();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [sourceFilter, setSourceFilter] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 20;

  const fetchArtworks = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);
    try {
      const result =
        searchSource === "met"
          ? await getMetSearchResults(searchTerm, currentPage, pageSize)
          : await getRijksSearchResults(searchTerm, currentPage, pageSize);

      setArtworks(result.artworks);
      setTotalPages(result.totalPages || 1);
      setTotalResults(result.total || result.artworks.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = page => {
    setSearchParams({ page: String(page) });
  };

  const handlePrev = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = [...artworks];

    if (sourceFilter) {
      filtered = filtered.filter(art => art.source === sourceFilter);
    }

    if (sortOrder === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [artworks, sortOrder, sourceFilter]);

  useEffect(() => {
    fetchArtworks();
  }, [searchTerm, searchSource, currentPage]);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!artworks || artworks.length === 0) return <p>No artworks found.</p>;

  return (
    <div className="artwork-results p-4 space-y-8">
      <FilterPanel
        selectedSort={sortOrder}
        onSortChange={setSortOrder}
        selectedSource={sourceFilter}
        onSourceFilterChange={setSourceFilter}
        enableSourceFilter={false}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSorted.map(artwork => (
          <ArtworkCard
            key={`${artwork.source}-${artwork.id}`}
            artwork={artwork}
          />
        ))}
      </div>
      <div className="pagination-controls flex flex-col items-center gap-4 mt-8 text-sm text-gray-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-1.5 border border-black rounded-full transition-colors duration-200 disabled:opacity-30 hover:bg-black hover:text-white"
          >
            Previous
          </button>

          <span className="tracking-wide">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span> ({totalResults}{" "}
            artworks)
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 border border-black rounded-full transition-colors duration-200 disabled:opacity-30 hover:bg-black hover:text-white"
          >
            Next
          </button>
        </div>

        {totalPages > 1 && (
          <div className="jump-to-page flex items-center gap-2">
            <label htmlFor="jump" className="text-gray-600">
              Jump to page:
            </label>
            <select
              id="jump"
              value={currentPage}
              onChange={e => goToPage(Number(e.target.value))}
              // className="px-3 py-1 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black bg-white"
              className="px-3 py-1 border border-black rounded bg-white text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
