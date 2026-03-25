import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorageSubmissions } from '../hooks/useLocalStorageSubmissions';

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

const initialFormData = {
  fullName: '',
  email: '',
  mobile: '',
  department: '',
};

function validateForm(formData) {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full Name must be at least 2 characters.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
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

export function ApplyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { addSubmission } = useLocalStorageSubmissions();

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

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      addSubmission({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        department: formData.department,
      });

      setFormData(initialFormData);
      setErrors({});
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      if (error.message && error.message.includes('email already exists')) {
        setErrors({ email: 'This email has already been used.' });
      } else {
        setErrors({ form: error.message || 'An unexpected error occurred.' });
      }
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Express Your Interest</h1>
          <p>
            Fill out the form below to let us know you're interested in joining
            our team. We'll review your submission and get back to you.
          </p>
        </div>

        {success && (
          <div
            className="form-card"
            style={{ marginBottom: 'var(--spacing-lg)' }}
          >
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h2>Application Submitted!</h2>
              <p>
                Thank you for your interest. We've received your submission and
                will be in touch soon.
              </p>
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {!success && (
          <div className="form-card">
            {errors.form && (
              <div
                className="form-error"
                style={{
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name<span className="form-label-required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-input${errors.fullName ? ' error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="form-error">{errors.fullName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address<span className="form-label-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="form-error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mobile">
                  Mobile Number<span className="form-label-required">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className={`form-input${errors.mobile ? ' error' : ''}`}
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <div className="form-error">{errors.mobile}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  Department of Interest
                  <span className="form-label-required">*</span>
                </label>
                <select
                  id="department"
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

              <div className="form-actions">
                <Link to="/" className="btn btn-secondary">
                  Back to Home
                </Link>
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}