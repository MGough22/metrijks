export default function FilterPanel({
  selectedSort,
  onSortChange,
  selectedSource,
  onSourceFilterChange,
  enableSourceFilter = false,
}) {
  return (
    <div className="w-full mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4">
      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-gray-700 font-medium">
          Sort by:
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={selectedSort}
            onChange={e => onSortChange(e.target.value)}
            className="appearance-none border border-black bg-white text-black text-sm rounded-full px-4 py-1 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="relevance">Relevance (Default)</option>
            <option value="title-asc">Title (A–Z)</option>
            <option value="title-desc">Title (Z–A)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Source Filter Toggle Buttons */}
      {enableSourceFilter && (
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Source:</span>
          {[
            { label: "All", value: "" },
            { label: "MET", value: "met" },
            { label: "Rijks", value: "rijks" },
          ].map(option => {
            const isActive = selectedSource === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onSourceFilterChange(option.value)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 focus:outline-none
                    ${
                      isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-gray-100"
                    }`}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
