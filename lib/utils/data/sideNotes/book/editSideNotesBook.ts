interface PostSideNotesBookProps {
  sideNoteData: any;
  onClose: () => void;
  prevNoteId: string;
  setNotes: any;
}

export async function editSideNotesBook({
  onClose,
  setNotes,
  prevNoteId,
  sideNoteData,
}: PostSideNotesBookProps) {
  try {
    // TODO: Add loading indicator on button
    const response = await fetch(
      `/api/sideNotes/book/editSideNote/?id=${prevNoteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sideNoteData),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data) {
        console.log("edit side note: data inside the if condition", data);
        setNotes(data.allSideNotes);
      }

      onClose();
    } else {
      // Handle error
      console.error("Failed to create side note");
    }
  } catch (error) {
    console.error("Failed to update side note:", error);
  }
}
