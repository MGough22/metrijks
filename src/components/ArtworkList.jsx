import { useEffect, useState } from "react";
import { getMetSearchResults } from "../apis/met";
import { getRijksSearchResults } from "../apis/rijks";
import { useSearchContext } from "../context/SearchContext";
import ArtworkCard from "./ArtworkCard";
import { hatch } from "ldrs";

hatch.register();

export default function ArtworkList() {
  const { searchTerm, searchSource } = useSearchContext();
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArtworks = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);
    try {
      const result =
        searchSource === "met"
          ? await getMetSearchResults(searchTerm)
          : await getRijksSearchResults(searchTerm);

      setArtworks(result.artworks);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [searchTerm, searchSource]);

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
