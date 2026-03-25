export function DeleteSubmissionModal({ submission, onDelete, onClose }) {
  const handleConfirm = () => {
    onDelete(submission.id);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2>Delete Submission</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-700)', fontSize: 'var(--font-size-sm)' }}>
            Are you sure you want to delete this submission? This action cannot be undone.
          </p>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div className="modal-detail-row">
              <span className="modal-detail-label">Name</span>
              <span className="modal-detail-value">{submission.fullName}</span>
            </div>
            <div className="modal-detail-row">
              <span className="modal-detail-label">Email</span>
              <span className="modal-detail-value">{submission.email}</span>
            </div>
          </div>

          <div className="modal-footer" style={{ padding: 0, borderTop: 'none', marginTop: 'var(--spacing-lg)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}