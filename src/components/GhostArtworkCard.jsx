export default function GhostArtworkCard({ opacity = 0 }) {
  return (
    <div
      className="bg-white border border-black-300 rounded-lg overflow-hidden h-[22rem] w-full transition-transform duration-1000"
      style={{ opacity }}
    />
  );
}
