export default function GhostArtworkCard({ opacity = 0 }) {
  return (
    <div
      className="bg-white border border-black/70 rounded-lg overflow-hidden transition-transform duration-1000 w-full aspect-[6/5]"
      style={{ opacity }}
    />
  );
}
