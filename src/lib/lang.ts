export type Lang = 'es' | 'en';

// First load: Spanish browsers get Spanish, anything else English. Nothing is stored anywhere;
// the ES | EN toggle changes the language in memory for the rest of the visit.
export const pickLang = (acceptLanguage?: string | null): Lang => {
  const first = acceptLanguage?.split(',')[0]?.trim().toLowerCase() ?? '';
  return first.startsWith('es') || first === '' ? 'es' : 'en';
};
