import { useEffect, useState } from "react";

export const LandscapeNotice = () => {
  const [show, setShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const isPortrait = () =>
      window.matchMedia("(orientation: portrait)").matches;

    const alreadyDismissed = sessionStorage.getItem("dismissedLandscapeHint");

    let showTimer, autoDismissTimer;

    if (isPortrait() && !alreadyDismissed) {
      showTimer = setTimeout(() => {
        setShow(true);

        autoDismissTimer = setTimeout(() => {
          dismissWithFade();
        }, 8000);
      }, 2000);
    }

    const handleResize = () => {
      if (!isPortrait()) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoDismissTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dismissWithFade = () => {
    setIsFadingOut(true);
    sessionStorage.setItem("dismissedLandscapeHint", "true");
    setTimeout(() => setShow(false), 500);
  };

  const handleDismiss = () => {
    dismissWithFade();
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/75 text-white text-sm px-4 py-2 rounded-2xl shadow-xl z-50 max-w-xs w-fit text-center flex items-center space-x-3 transition-opacity duration-500 ${
        isFadingOut
          ? "opacity-0 animate-fade-out-slow"
          : "opacity-100 animate-fade-in-slow"
      }`}
    >
      <span>Try rotating your device to view more results at once.</span>
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
