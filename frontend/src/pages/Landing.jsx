import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="landing-page">

            <section className="landing-hero">

                <div className="landing-content">

                    <h1>
                        Smart Visa & Travel
                        <br />
                        Document Tracker
                    </h1>

                    <p>
                        Manage your passports, visas, insurance,
                        vaccinations and travel documents in one place.
                    </p>

                    <div className="landing-actions">

                        <Link
                            to="/register"
                            className="landing-button primary"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="landing-button secondary"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </section>

            <section className="landing-features">

                <div className="feature-card">
                    <h3>Document Management</h3>
                    <p>
                        Keep all your important travel documents
                        organized in one place.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Expiry Tracking</h3>
                    <p>
                        Monitor document expiry dates and avoid
                        missing important deadlines.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Smart Reminders</h3>
                    <p>
                        Stay informed about upcoming document
                        renewals and travel requirements.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Landing;