export async function getSideNotesBook() {
  const response = await fetch("/api/sideNotes/getSideNotesBook");
  if (!response.ok) {
    throw new Error("Failed to retrieve side notes");
  }
  const data = await response.json();
  return data;
}
