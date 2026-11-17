
import React, { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const colors = [
    "bg-yellow-100",
    "bg-pink-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
  ];

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and note!");
      return;
    }

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, title, content }
            : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleString(),
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-5 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            📝 My Notes
          </h1>
          <span className="text-sm">
            Your Personal Notebook
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to Notes App
          </h2>
          <p className="text-gray-500 mt-2">
            Write your thoughts, save your ideas and stay organized.
          </p>
        </div>

        {/* Add Note Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {editId ? "Edit Your Note" : "Create New Note"}
          </h3>

          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex gap-3">
            <button
              onClick={addNote}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {editId ? "Update Note" : "+ Add Note"}
            </button>

            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setTitle("");
                  setContent("");
                }}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            My Notes ({notes.length})
          </h3>

          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 w-full sm:w-72 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <div className="text-5xl mb-3">📒</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Notes Found
            </h3>
            <p className="text-gray-500 mt-2">
              Create your first note to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`${note.color} p-5 rounded-2xl shadow-sm hover:shadow-lg transition duration-300`}
              >
                <h4 className="text-xl font-bold text-gray-800 mb-3 break-words">
                  {note.title}
                </h4>

                <p className="text-gray-700 whitespace-pre-wrap break-words min-h-24">
                  {note.content}
                </p>

                <p className="text-xs text-gray-500 mt-5">
                  {note.date}
                </p>

                <div className="flex gap-3 mt-4 border-t border-gray-400/30 pt-3">
                  <button
                    onClick={() => editNote(note)}
                    className="text-indigo-700 font-semibold hover:underline"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <footer className="text-center text-gray-500 py-6 mt-10">
        Made with ❤️ using React & Tailwind CSS
      </footer>
    </div>
  );
};

export default App;
