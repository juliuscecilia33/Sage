export const generateKey = (
  version: string,
  bookId: string,
  chapter: number
): string => {
  return `${version}-${bookId}-${chapter}`;
};
