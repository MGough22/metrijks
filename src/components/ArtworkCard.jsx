import { Link } from "react-router";

export default function ArtworkCard({ artwork }) {
  //   const artworkLink = `/artwork/${artwork.source}/${artwork.id}`;
  // improve to above more general when adding other API

  // className="article-instance"

  return (
    <div className="artwork-card">
      <Link to={`/artwork/met/${artwork.id}`}>
        <img src={artwork.image} alt={`Image of ${artwork.title}`} />
        <p className="artwork-title">{artwork.title}</p>
        <hr />
        <div className="other-info">
          <p>By {artwork.artist}</p>
          <p>From: {artwork.source.toUpperCase()}</p>
        </div>
      </Link>
    </div>
  );
}
