function DeleteModal({
  onConfirm,
  onClose
}) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h3>Delete Note</h3>

        <p>
          Are you sure you want to delete this note?
        </p>

        <div className="delete-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;