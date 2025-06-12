import { useCollection } from "../hooks/useCollection";
import { useSearchContext } from "../context/SearchContext";
import { Link } from "react-router";

export const Exhibition = () => {
  const { collection, removeFromCollection } = useCollection();
  const { collectionSearchTerm } = useSearchContext();

  const filtered = collection.filter(item =>
    item.title.toLowerCase().includes(collectionSearchTerm.toLowerCase())
  );

  if (collection.length === 0) {
    return <p>Your exhibition is currently empty.</p>;
  }

  if (filtered.length === 0) {
    return <p>No artworks match your current search.</p>;
  }

  return (
    <div className="exhibition-gallery">
      {filtered.map(item => (
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
  );
};
