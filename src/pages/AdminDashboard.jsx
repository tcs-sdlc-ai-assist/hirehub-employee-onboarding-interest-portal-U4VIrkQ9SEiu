import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthProvider';
import { useLocalStorageSubmissions } from '../hooks/useLocalStorageSubmissions';
import { StatCards } from '../components/StatCards';
import { SubmissionsTable } from '../components/SubmissionsTable';
import { EditSubmissionModal } from '../components/EditSubmissionModal';
import { DeleteSubmissionModal } from '../components/DeleteSubmissionModal';
import { AdminLoginForm } from '../components/AdminLoginForm';

export function AdminDashboard() {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const {
    submissions,
    updateSubmission,
    deleteSubmission,
    resetSubmissions,
  } = useLocalStorageSubmissions();

  const [editingSubmission, setEditingSubmission] = useState(null);
  const [deletingSubmission, setDeletingSubmission] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
  };

  const handleDelete = (submission) => {
    setDeletingSubmission(submission);
  };

  const handleSave = (id, updates) => {
    updateSubmission(id, updates);
  };

  const handleConfirmDelete = (id) => {
    deleteSubmission(id);
  };

  const handleCloseEdit = () => {
    setEditingSubmission(null);
  };

  const handleCloseDelete = () => {
    setDeletingSubmission(null);
  };

  if (!isAdmin) {
    return <AdminLoginForm />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-header-actions">
          <button className="btn btn-danger btn-sm" onClick={resetSubmissions}>
            Reset All
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <StatCards submissions={submissions} />

      <SubmissionsTable
        submissions={submissions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingSubmission && (
        <EditSubmissionModal
          submission={editingSubmission}
          onSave={handleSave}
          onClose={handleCloseEdit}
        />
      )}

      {deletingSubmission && (
        <DeleteSubmissionModal
          submission={deletingSubmission}
          onDelete={handleConfirmDelete}
          onClose={handleCloseDelete}
        />
      )}
    </div>
  );
}