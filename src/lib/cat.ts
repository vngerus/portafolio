// Lets any component talk to the floating Banana Cat without importing it.
export type CatKind = 'celebrate' | 'oops';

export const catEvent = (kind: CatKind, text?: string) => {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('cat', { detail: { kind, text } }));
};
