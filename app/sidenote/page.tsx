"use client";

import { useState } from "react";

const AddSideNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState<number>(0);
  const [verse, setVerse] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sideNoteData = {
      userId: "4de131d1-dcd7-4aff-95e5-3c8e2b132725", // Replace this with the actual user ID from Supabase auth
      title,
      description,
      book,
      chapter,
      verse,
    };

    const response = await fetch("/api/sideNotes/postSideNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideNoteData),
    });

    if (response.ok) {
      console.log("pushed data", response);
      // Redirect or show a success message
      //   router.push("/da");
    } else {
      // Handle error
      console.error("Failed to create side note");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h1 className="text-2xl font-bold mb-4">Add a New Side Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="book"
            className="block text-sm font-medium text-gray-700"
          >
            Book
          </label>
          <input
            type="text"
            id="book"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="chapter"
            className="text-black block text-sm font-medium text-gray-700"
          >
            Chapter
          </label>
          <input
            type="number"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="verse"
            className="block text-sm font-medium text-gray-700"
          >
            Verse
          </label>
          <input
            type="number"
            id="verse"
            value={verse}
            onChange={(e) => setVerse(Number(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Side Note
        </button>
      </form>
    </div>
  );
};

export default AddSideNote;
