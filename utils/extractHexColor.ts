export const extractHexColor = (str: string): string | null => {
  const match = str.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
  return match ? match[0] : null;
};

export const extractAndAppendText = (str: string): string | null => {
  const match = str.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);
  return match ? `text-${match[0]}` : null;
};
