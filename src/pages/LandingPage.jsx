import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>
            Welcome to <span className="landing-hero-highlight">HireHub</span>
          </h1>
          <p>
            Your gateway to an exciting career. Express your interest in joining
            our team and take the first step towards a rewarding professional
            journey.
          </p>
          <div className="landing-hero-actions">
            <Link to="/apply" className="btn btn-primary btn-lg">
              Express Your Interest
            </Link>
            <Link to="/admin" className="btn btn-secondary btn-lg">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-features-title">Why Join Us?</h2>
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">💡</div>
            <h3>Innovation</h3>
            <p>
              Work on cutting-edge projects that push boundaries and shape the
              future of technology. We encourage creative thinking and bold ideas.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>
              Accelerate your professional development with mentorship programs,
              learning opportunities, and clear paths for advancement.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">🤝</div>
            <h3>Great Culture</h3>
            <p>
              Join a diverse and inclusive team that values collaboration,
              transparency, and work-life balance. Your well-being matters to us.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">🌍</div>
            <h3>Global Impact</h3>
            <p>
              Be part of a mission that makes a difference worldwide. Our work
              reaches millions of people across the globe every day.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>Ready to Get Started?</h1>
          <p>
            Take the first step towards joining our team. Fill out the interest
            form and we'll be in touch soon.
          </p>
          <div className="landing-hero-actions">
            <Link to="/apply" className="btn btn-primary btn-lg">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}