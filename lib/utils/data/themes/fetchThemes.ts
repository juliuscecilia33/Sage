export async function getThemes() {
  const response = await fetch("/api/theme/user/getTheme");
  if (!response.ok) {
    throw new Error("Failed to retrieve Themes");
  }
  const data = await response.json();
  return data;
}
