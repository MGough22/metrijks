import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router";

export const Exhibition = () => {
  const { collection, removeFromCollection } = useCollection();

  console.log("collection in Exhibition", collection);

  if (collection.length === 0) {
    return <p>Your exhibition is currently empty.</p>;
  }

  return (
    <div className="exhibition-gallery">
      {collection.map(item => (
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
