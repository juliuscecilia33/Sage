import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface SideNote {
  id: string;
  title: string;
  description: string;
  book: string;
  verse: string;
  userTheme: string;
  isPrivate: boolean;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

export const handleDelete = async (
  id: String,
  setSideNotesBook: SetSideNotesBook
) => {
  try {
    const response = await axios.delete(
      `/api/sideNotes/book/deleteSideNote/?id=${id}`
    );

    if (response.status === 200) {
      setSideNotesBook((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
      console.log("Successfully deleted side note");
    } else {
      console.error("Failed to delete side note", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
