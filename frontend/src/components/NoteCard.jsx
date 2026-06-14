import { FaRegStickyNote } from "react-icons/fa";

function NoteCard({ note, onClick }) {
  return (
    <div
      className="note-card"
      onClick={() => onClick(note)}
    >
      <div className="note-card-header">
        <h3>{note.title}</h3>

        {note.pinned && (
          <span className="pinned-badge">
            Pinned
          </span>
        )}
      </div>

      <p className="note-preview">
        {note.content.length > 120
          ? `${note.content.slice(0, 120)}...`
          : note.content}
      </p>

      {note.tags?.length > 0 && (
        <div className="tags-wrapper">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <div className="note-date">
          <FaRegStickyNote />

          <span>
            {new Date(note.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;