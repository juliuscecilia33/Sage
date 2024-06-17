// pages/sidenotes/add.tsx

import { useState } from "react";
import { useRouter } from "next/router";

const AddSideNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState<number>(0);
  const [verse, setVerse] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sideNoteData = {
      userId: "some-user-id", // Replace this with the actual user ID from Supabase auth
      title,
      description,
      book,
      chapter,
      verse,
    };

    const response = await fetch("/api/sidenotes/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideNoteData),
    });

    if (response.ok) {
      // Redirect or show a success message
      router.push("/");
    } else {
      // Handle error
      console.error("Failed to create side note");
    }
  };

  return (
    <div>
      <h1>Add a New Side Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="book">Book:</label>
          <input
            type="text"
            id="book"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="chapter">Chapter:</label>
          <input
            type="number"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="verse">Verse:</label>
          <input
            type="number"
            id="verse"
            value={verse}
            onChange={(e) => setVerse(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Side Note</button>
      </form>
    </div>
  );
};

export default AddSideNote;
