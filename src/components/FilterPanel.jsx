import { useLocation } from "react-router";

export default function FilterPanel({
  selectedSort,
  onSortChange,
  selectedSource,
  onSourceFilterChange,
  enableSourceFilter = false,
}) {
  const location = useLocation();

  return (
    <div className="filter-panel">
      <label>
        Sort by:
        <select
          value={selectedSort}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="relevance">Relevance (Default)</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
        </select>
      </label>

      {enableSourceFilter && (
        <fieldset>
          <legend>Filter by Source:</legend>
          <label>
            <input
              type="radio"
              name="source"
              value=""
              checked={selectedSource === ""}
              onChange={e => onSourceFilterChange(e.target.value)}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="source"
              value="met"
              checked={selectedSource === "met"}
              onChange={e => onSourceFilterChange(e.target.value)}
            />
            MET
          </label>
          <label>
            <input
              type="radio"
              name="source"
              value="rijks"
              checked={selectedSource === "rijks"}
              onChange={e => onSourceFilterChange(e.target.value)}
            />
            Rijksmuseum
          </label>
        </fieldset>
      )}
    </div>
  );
}
