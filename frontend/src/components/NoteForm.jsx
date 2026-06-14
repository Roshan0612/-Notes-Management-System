import { useState } from "react";

function NoteForm({ onSubmit,onClose, existingNote }) {
  
  const [title, setTitle] = useState(
  existingNote?.title || ""
  );

  const [content, setContent] = useState(
  existingNote?.content || ""
  );

  const [tags, setTags] = useState(
  existingNote?.tags?.join(", ") || ""
  );

  const [pinned, setPinned] = useState(
  existingNote?.pinned || false
  );

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return setError("Title is required");
    }

    onSubmit({
      title,
      content,
      pinned,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{existingNote ? "Edit Note" : "Create Note"}</h2>

          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>

            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="form-group">
            <label>Content</label>

            <textarea
              rows="6"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tags</label>

            <input
              type="text"
              placeholder="work, personal, ideas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={pinned}
              onChange={() => setPinned(!pinned)}
            />

            <span>Pin this note</span>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="submit-btn">
              {existingNote ? "Update Note" : "Create Note"}
          </button>
        </form>
      </div> 
    </div>
  );
}

export default NoteForm;