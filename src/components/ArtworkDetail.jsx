import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getMetObjectDetails } from "../apis/met";
import { getRijksObjectDetails } from "../apis/rijks";
import { useCollection } from "../hooks/useCollection";
import { hatch } from "ldrs";

hatch.register();

export const ArtworkDetail = () => {
  const { source, id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCollection, collection } = useCollection();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        let data;
        if (source === "met") {
          data = await getMetObjectDetails(id);
        } else if (source === "rijks") {
          data = await getRijksObjectDetails(id);
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

  const isSaved = collection.some(
    item =>
      item.id === (artwork.id ?? artwork.objectID) &&
      item.source === artwork.source
  );

  return (
    <div className="artwork-detail flex flex-col md:flex-row gap-8 p-6">
      <div className="md:w-1/2">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full max-h-[750px] object-contain border border-gray-200 opacity-0 animate-fade-in"
        />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-1.5 border border-black rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      <div className="md:w-1/2 space-y-4 text-gray-800 text-sm">
        <h2 className="text-xl font-medium">{artwork.title}</h2>

        {!isSaved ? (
          <button
            onClick={() =>
              addToCollection({
                id: artwork.id ?? artwork.objectID,
                source: artwork.source,
                title: artwork.title,
                image: artwork.image,
              })
            }
            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors duration-200 text-sm"
          >
            Add to your Collection
          </button>
        ) : (
          <p className="text-green-600 font-medium">✓ In your collection</p>
        )}

        <p>
          <strong>Artist:</strong>{" "}
          {artwork.artistDisplayName || <span className="italic">Unknown</span>}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {artwork.objectDate || <span className="italic">Unspecified</span>}
        </p>
        <p>
          <strong>Medium:</strong>{" "}
          {artwork.medium || <span className="italic">Unspecified</span>}
        </p>
        <p>
          <strong>Dimensions:</strong>{" "}
          {artwork.dimensions || <span className="italic">Unspecified</span>}
        </p>
        <p>
          <strong>Credit Line:</strong>{" "}
          {artwork.creditLine || <span className="italic">Unspecified</span>}
        </p>
        <p>
          <a
            href={artwork.objectURL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4 decoration-1 hover:text-black text-black transition-all"
          >
            View on museum site →
          </a>
        </p>
      </div>
    </div>
  );
};
