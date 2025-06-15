import GhostArtworkGrid from "./GhostArtworkGrid";
import { useEffect, useState } from "react";

export default function LandingSuggestions({ onSelect }) {
  const suggestions = ["Cézanne", "Ancient", "Calligraphic", "Rembrandt"];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-10rem)] px-4 py-16 overflow-hidden">
      {/* Ghost grid */}
      <div className="absolute inset-0 z-[-1]">
        <GhostArtworkGrid />
      </div>

      {/* Welcome information */}
      <div
        className={`max-w-xl mx-auto border border-black rounded-xl p-10 shadow-md text-center space-y-6 z-10 transition-opacity duration-2000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%)",
        }}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Welcome to <span className="tracking-wide">METRIJKS</span>
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          Discover and curate your own virtual exhibition from two of the
          world’s greatest museum collections — the Met and the Rijksmuseum.
        </p>
        <p className="text-sm text-gray-700">
          Try it out by clicking on a suggestion below, or use the search above
          to begin.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {suggestions.map(term => (
            <button
              key={term}
              onClick={() => onSelect(term)}
              className="px-4 py-1.5 border bg-white/85 border-black rounded-md hover:bg-black hover:text-white transition-colors duration-200 text-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
