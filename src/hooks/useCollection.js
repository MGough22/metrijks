import { useEffect, useState } from "react";

const COLLECTION_KEY = "userCollection";

export const useCollection = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(COLLECTION_KEY);
    if (saved) {
      setCollection(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  }, [collection]);

  const addToCollection = artwork => {
    const exists = collection.some(
      item => item.id === artwork.id && item.source === artwork.source
    );
    if (!exists) {
      setCollection([...collection, artwork]);
    }
  };

  const removeFromCollection = (id, source) => {
    const updated = collection.filter(
      item => !(item.id === id && item.source === source)
    );
    setCollection(updated);
  };

  return {
    collection,
    addToCollection,
    removeFromCollection,
  };
};
