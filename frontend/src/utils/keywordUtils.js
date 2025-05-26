export const filterKeywords = (input, predefinedKeywords) => {
  const inputParts = input.split(',').map(part => part.trim().toLowerCase());
  const lastWord = inputParts[inputParts.length - 1] || '';
  const existingKeywords = inputParts.slice(0, -1).filter(Boolean);

  if (input.endsWith(',')) return [];

  return predefinedKeywords
    .filter(kw =>
      kw.toLowerCase().startsWith(lastWord) &&
      !existingKeywords.includes(kw.toLowerCase())
    )
    .sort()
    .slice(0, 5);
};
