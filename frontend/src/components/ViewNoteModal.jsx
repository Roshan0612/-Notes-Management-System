function ViewNoteModal({
  note,
  onClose,
  onEdit,
  onDelete
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{note.title}</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="view-note-content">
          <p>{note.content}</p>
        </div>

        {note.tags?.length > 0 && (
          <div className="tags-wrapper">
            {note.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="note-meta">
          <p>
            Created:
            {" "}
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <p>
            Updated:
            {" "}
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="modal-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(note)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewNoteModal;