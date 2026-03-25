import { useState } from 'react';

const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
];

function validateForm(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full Name must be at least 2 characters.';
  } else if (formData.fullName.trim().length > 64) {
    errors.fullName = 'Full Name must be at most 64 characters.';
  }

  if (!formData.mobile.trim()) {
    errors.mobile = 'Mobile Number is required.';
  } else if (!/^\+?\d{10,15}$/.test(formData.mobile.trim().replace(/[\s\-()]/g, ''))) {
    errors.mobile = 'Please enter a valid mobile number (10-15 digits).';
  }

  if (!formData.department) {
    errors.department = 'Department is required.';
  }

  return errors;
}

export function EditSubmissionModal({ submission, onSave, onClose }) {
  const [formData, setFormData] = useState({
    fullName: submission.fullName || '',
    email: submission.email || '',
    mobile: submission.mobile || '',
    department: submission.department || '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      onSave(submission.id, {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        department: formData.department,
      });
      onClose();
    } catch (error) {
      setSubmitError(error.message || 'An unexpected error occurred.');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Submission</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {submitError && (
            <div
              className="form-error"
              style={{
                marginBottom: 'var(--spacing-lg)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="edit-fullName">
                Full Name<span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="edit-fullName"
                name="fullName"
                className={`form-input${errors.fullName ? ' error' : ''}`}
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="form-error">{errors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-email">
                Email Address
              </label>
              <input
                type="email"
                id="edit-email"
                name="email"
                className="form-input"
                value={formData.email}
                readOnly
                style={{ backgroundColor: 'var(--color-gray-100)', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-mobile">
                Mobile Number<span className="form-label-required">*</span>
              </label>
              <input
                type="tel"
                id="edit-mobile"
                name="mobile"
                className={`form-input${errors.mobile ? ' error' : ''}`}
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <div className="form-error">{errors.mobile}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="edit-department">
                Department<span className="form-label-required">*</span>
              </label>
              <select
                id="edit-department"
                name="department"
                className={`form-select${errors.department ? ' error' : ''}`}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="form-error">{errors.department}</div>
              )}
            </div>

            <div className="modal-footer" style={{ padding: 0, borderTop: 'none', marginTop: 'var(--spacing-lg)' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}