import { useEffect, useState } from "react";

export const LandscapeNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isLandscapeAndWideEnough = () =>
      window.matchMedia("(orientation: landscape)").matches;

    if (
      !isLandscapeAndWideEnough() &&
      !sessionStorage.getItem("dismissedLandscapeHint")
    ) {
      setShow(true);
    }

    const handleResize = () => {
      if (isLandscapeAndWideEnough()) {
        setShow(false);
      } else if (
        !isLandscapeAndWideEnough() &&
        !sessionStorage.getItem("dismissedLandscapeHint")
      ) {
        setShow(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("dismissedLandscapeHint", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/65 text-white text-sm px-4 py-2 rounded-2xl shadow-xl z-50 animate-fade-in flex items-center space-x-3">
      <span>Rotate your device for optimum viewing.</span>
      <button
        onClick={handleDismiss}
        className="ml-2 px-2 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Dismiss orientation hint"
      >
        ✕
      </button>
    </div>
  );
};
