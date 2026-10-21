// Navigation to a section of the home page without leaving a #hash in the URL.
// The target waits in memory (module scope survives client-side navigation) until the home page mounts.
let pending: string | null = null;

// peek + clear (not "take"): React StrictMode runs effects twice in dev, the second run must still see it.
export const peekPending = () => pending;
export const clearPending = () => {
  pending = null;
};

export const scrollToSection = (id: string, smooth: boolean) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto', block: 'start' });
};

export const cleanHash = () => {
  if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
};

// On "/": scroll in place. On any other page: go home and let the home page scroll on mount.
export function goToSection(id: string, onHome: boolean, push: (url: string) => void) {
  if (onHome) {
    scrollToSection(id, true);
    cleanHash();
  } else {
    pending = id;
    push('/');
  }
}
