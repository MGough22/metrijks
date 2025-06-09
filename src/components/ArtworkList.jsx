import { useEffect, useState } from "react";
import { getMetSearchResults } from "../apis/met";
import ArtworkCard from "./ArtworkCard";
import { hatch } from "ldrs";

hatch.register();

export default function ArtworkList({ searchTerm }) {
  const [artworks, setArtworks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtworks = async () => {
    try {
      setIsLoading(true);
      const response = searchTerm
        ? await getMetSearchResults(searchTerm)
        : { artworks: [] };
      setArtworks(response.artworks);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [searchTerm]);

  if (isLoading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  console.log("here1");
  if (error) return <p>Error: {error}</p>;
  if (!artworks || artworks.length === 0) return <p>No artworks found.</p>;
  console.log("here3");

  return (
    <div className="artwork-collection">
      {artworks.map(artwork => (
        <ArtworkCard
          key={`${artwork.source}-${artwork.id}`}
          artwork={artwork}
        />
      ))}
    </div>
  );
}
