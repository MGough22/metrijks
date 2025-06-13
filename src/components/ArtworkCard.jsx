import { Link } from "react-router";

export default function ArtworkCard({ artwork }) {
  const fallback = "https://www.freeiconspng.com/uploads/no-image-icon-6.png";
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50 hover:border-gray-300 border border-transparent">
      <Link to={`/artworks/${artwork.source}/${artwork.id}`}>
        <img
          src={artwork.image}
          alt={`Image of ${artwork.title}`}
          className="w-full h-64 object-cover"
          onError={e => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{artwork.title}</h3>
          <p className="text-sm text-gray-600 italic">{artwork.artist}</p>
          <p className="text-sm text-gray-600 italic">
            From: {artwork.source.toUpperCase()}
          </p>
        </div>
      </Link>
    </div>
  );
}
