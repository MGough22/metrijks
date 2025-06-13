import { useEffect, useRef, useState } from "react";
import GhostArtworkCard from "./GhostArtworkCard";

const TOTAL_CARDS = 20;

export default function GhostArtworkGrid() {
  const [opacities, setOpacities] = useState(() =>
    Array.from({ length: TOTAL_CARDS }, () => 0)
  );

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const offsets = useRef(
    Array.from({ length: TOTAL_CARDS }, () => Math.random() * Math.PI * 2)
  );

  const frequencies = useRef(
    Array.from({ length: TOTAL_CARDS }, () => 0.8 + Math.random() * 0.7)
  );

  useEffect(() => {
    const animate = timestamp => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      const newOpacities = offsets.current.map((offset, i) => {
        const sine = Math.sin(elapsed * frequencies.current[i] + offset);
        const shimmer = 0.5 * (sine + 1);
        return shimmer;
      });

      setOpacities(newOpacities);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10 pointer-events-none">
      {opacities.map((opacity, i) => (
        <GhostArtworkCard key={i} opacity={opacity} />
      ))}
    </div>
  );
}
