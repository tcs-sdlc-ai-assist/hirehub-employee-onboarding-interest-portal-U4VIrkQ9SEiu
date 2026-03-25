import { useState } from 'react';

export function SubmissionsTable({ submissions, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>All Submissions</h2>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="table-empty">
                    <p>No submissions yet.</p>
                  </div>
                </td>
              </tr>
            ) : (
              submissions.map((submission, index) => (
                <tr key={submission.id}>
                  <td>{index + 1}</td>
                  <td>{submission.fullName}</td>
                  <td>{submission.email}</td>
                  <td>{submission.mobile}</td>
                  <td>{submission.department}</td>
                  <td>{formatDate(submission.submittedOn)}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="table-action-btn"
                        onClick={() => onEdit(submission)}
                        title="Edit submission"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="table-action-btn danger"
                        onClick={() => onDelete(submission)}
                        title="Delete submission"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}