import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMetObjectDetails } from "../apis/met";
import { useCollection } from "../hooks/useCollection";
import { hatch } from "ldrs";

hatch.register();

export const ArtworkDetail = () => {
  // const { id } = useParams();
  const { source, id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCollection, collection } = useCollection();

  //   const isSaved = collection.some(
  //     item => item.id === artwork.objectID && item.source === "met"
  //   );

  const isSaved = collection.some(
    item => item.id === artwork?.objectID && item.source === "met"
  );

  //   useEffect(() => {
  //     const fetchArtwork = async () => {
  //       try {
  //         const data = await getMetObjectDetails(id);
  //         setArtwork(data);
  //       } catch (err) {
  //         setError("Failed to fetch artwork");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchArtwork();
  //   }, [id]);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        let data;
        if (source === "met") {
          data = await getMetObjectDetails(id);
        } else {
          throw new Error("Unsupported source: " + source);
        }
        setArtwork(data);
      } catch (err) {
        setError("Failed to fetch artwork");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id, source]);

  if (loading)
    return (
      <div className="loading-anim">
        <l-hatch size="150" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!artwork) return <p>No artwork found</p>;

  return (
    <div className="artwork-detail">
      <img src={artwork.primaryImage} alt={artwork.title} />
      <h2>{artwork.title}</h2>
      {!isSaved ? (
        <button
          onClick={() =>
            addToCollection({
              id: artwork.objectID,
              source: "met",
              title: artwork.title,
              image: artwork.primaryImageSmall,
            })
          }
        >
          Add to your Collection
        </button>
      ) : (
        <p>✓ In your collection</p>
      )}
      <p>
        <strong>Artist:</strong> {artwork.artistDisplayName || "Unknown"}
      </p>
      <p>
        <strong>Date:</strong> {artwork.objectDate}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium}
      </p>
      <p>
        <strong>Dimensions:</strong> {artwork.dimensions}
      </p>
      <p>
        <strong>Credit Line:</strong> {artwork.creditLine}
      </p>
      <p>
        <a href={artwork.objectURL} target="_blank" rel="noreferrer">
          View on MET site
        </a>
      </p>
    </div>
  );
};
