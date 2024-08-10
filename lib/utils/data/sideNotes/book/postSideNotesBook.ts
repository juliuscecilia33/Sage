interface PostSideNotesBookProps {
  sideNoteData: any;
  onClose: () => void;
  previousNotes: any;
  setNotes: any;
}

export async function postSideNotesBook({
  onClose,
  setNotes,
  previousNotes,
  sideNoteData,
}: PostSideNotesBookProps) {
  try {
    // TODO: Add loading indicator on button
    console.log("sideNoteData on post: ", sideNoteData);

    const response = await fetch("/api/sideNotes/book/postSideNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideNoteData),
    });

    if (response.ok) {
      const data = await response.json();

      if (data) {
        console.log("data inside the if condition", data);
        setNotes([...previousNotes, data.newSideNote]);
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
