import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMetObjectDetails } from "../apis/met";

export const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await getMetObjectDetails(id);
        setArtwork(data);
      } catch (err) {
        setError("Failed to fetch artwork");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!artwork) return <p>No artwork found</p>;

  return (
    <div className="artwork-detail">
      <img src={artwork.primaryImage} alt={artwork.title} />
      <h2>{artwork.title}</h2>
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
