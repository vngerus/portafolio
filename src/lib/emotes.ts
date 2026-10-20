// Animated Noto emotes live in /public/emotes (see scripts/fetch-emotes.mjs).
// Anything not downloaded falls back to the plain text emoji.
const AVAILABLE = new Set([
  '1f44b', '1f917', '1f998', '1f680', '1f60e', '1f463', '1f440', '1f914', '1f60c', '2615',
  '1f635', '1f4a5', '1f62e_200d_1f4a8', '1f4aa', '1f973', '1f633', '1f62c', '1f634', '1f9d0',
  '1f92b', '1f6a7', '1f449', '1f389', '1f604', '1f60a', '1f48c', '1f4bb', '1f609', '1f929', '1f97a', '1f622', '1f62d', '1f494', '1f431',
]);

export const emoteSrc = (emoji: string) => {
  const cp = [...emoji]
    .filter(c => c !== '️')
    .map(c => c.codePointAt(0)!.toString(16))
    .join('_');
  return AVAILABLE.has(cp) ? `/emotes/${cp}.webp` : null;
};
