const fallbackImages = [
  "/assets/fallbacks/f1.png", // cyanotype
  "/assets/fallbacks/f2.png", // floretine drawing
  "/assets/fallbacks/f3.png", // paul klee
  "/assets/fallbacks/f4.png", // quasi-constable
  "/assets/fallbacks/f5.png", // pseudo-monet
  "/assets/fallbacks/f6.png", // roman mosaic
  "/assets/fallbacks/f7.png", // picasso-but-not-so-much
  "/assets/fallbacks/f8.png", // a la sainte-chapelle
];

export const getRandomFallback = () =>
  fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
