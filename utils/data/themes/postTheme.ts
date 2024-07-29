import { Dispatch, SetStateAction } from "react";

interface ThemeData {
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetUserThemes = Dispatch<SetStateAction<ThemeData[]>>;

interface PostThemeProps {
  onClose: () => void;
  themeData: ThemeData;
  previousThemes: ThemeData[];
  setThemes: SetUserThemes;
}

export async function postTheme({
  themeData,
  onClose,
  previousThemes,
  setThemes,
}: PostThemeProps) {
  try {
    // TODO: Add loading indicator on button

    const response = await fetch("/api/theme/user/postTheme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themeData),
    });

    if (response.ok) {
      const data = await response.json();

      if (data) {
        console.log("theme data inside the if condition", data);
        setThemes((prevThemes) => [...prevThemes, data.newTheme]);
      }

      onClose();
      // Redirect or show a success message
    } else {
      // Handle error
      console.error("Failed to create side note");
    }
  } catch (error) {
    console.error("Failed to update side note:", error);
  }
}
