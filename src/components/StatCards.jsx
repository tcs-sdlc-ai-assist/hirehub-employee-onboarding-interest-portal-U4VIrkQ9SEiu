export function StatCards({ submissions }) {
  const totalSubmissions = submissions.length;

  const uniqueDepartments = new Set(submissions.map((s) => s.department)).size;

  const latestSubmission = submissions.length > 0
    ? submissions.reduce((latest, s) => {
        const date = new Date(s.submittedOn);
        return date > latest ? date : latest;
      }, new Date(submissions[0].submittedOn))
    : null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Total Submissions</span>
          <div className="stat-card-icon primary">📋</div>
        </div>
        <div className="stat-card-value">{totalSubmissions}</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Departments</span>
          <div className="stat-card-icon success">🏢</div>
        </div>
        <div className="stat-card-value">{uniqueDepartments}</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-label">Latest Submission</span>
          <div className="stat-card-icon info">📅</div>
        </div>
        <div className="stat-card-value" style={{ fontSize: 'var(--font-size-lg)' }}>
          {formatDate(latestSubmission)}
        </div>
      </div>
    </div>
  );
}