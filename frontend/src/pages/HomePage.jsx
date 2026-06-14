import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import ViewNoteModal from "../components/ViewNoteModal";
import DeleteModal from "../components/DeleteModal";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "../api/noteApi";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [editNote, setEditNote] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const data = await getNotes(search);

      setNotes(data.data);
    } catch (error) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);

      setShowForm(false);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(editNote._id, noteData);

      setEditNote(null);

      setSelectedNote(null);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote(selectedNote._id);

      setDeleteModal(false);

      setSelectedNote(null);

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <>
      <Navbar />

      {showForm && (
        <NoteForm
          onSubmit={handleCreateNote}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedNote && !editNote && (
        <ViewNoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onEdit={(note) => setEditNote(note)}
          onDelete={() => setDeleteModal(true)}
        />
      )}

      {editNote && (
        <NoteForm
          existingNote={editNote}
          onSubmit={handleUpdateNote}
          onClose={() => setEditNote(null)}
        />
      )}

      {deleteModal && (
        <DeleteModal
          onConfirm={handleDeleteNote}
          onClose={() => setDeleteModal(false)}
        />
      )}

      <main className="container">
        <div className="page-header">
          <div>
            <h1>Your Notes</h1>

            <p>
              Manage and organize your notes easily.
            </p>
            <input
              type="text"
              placeholder="Search notes..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="create-btn"
            onClick={() => setShowForm(true)}
          >
            Create Note
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">
            {error}
          </p>
        ) : notes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onClick={setSelectedNote}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default HomePage;