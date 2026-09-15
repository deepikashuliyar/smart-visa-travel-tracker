import { useEffect, useState } from "react";
import { getAnalytics } from "../../api/adminApi";
import Loading from "../../components/Loading";

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAnalytics();

            setAnalytics(data);
        } catch (error) {
            console.error("Error loading analytics:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load analytics."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalytics();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const totalUsers = analytics?.totalUsers ?? 0;
    const totalPassports = analytics?.totalPassports ?? 0;
    const totalVisas = analytics?.totalVisas ?? 0;
    const totalInsurances = analytics?.totalInsurances ?? 0;
    const totalVaccinations = analytics?.totalVaccinations ?? 0;
    const totalTravelHistory = analytics?.totalTravelHistory ?? 0;
    const totalDocuments = analytics?.totalDocuments ?? 0;
    const totalReminders = analytics?.totalReminders ?? 0;

    return (
        <div className="admin-page">

            <div className="documents-header">

                <div>
                    <h1>System Analytics</h1>

                    <p>
                        View important statistics and activity
                        across the Smart Visa Travel Tracker.
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={loadAnalytics}
                >
                    Refresh
                </button>

            </div>


            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}


            {!error && analytics && (
                <>

                    {/* Main Statistics */}

                    <div className="admin-stats-grid">

                        <div className="admin-stat-card">
                            <h3>Total Users</h3>

                            <strong>
                                {totalUsers}
                            </strong>

                            <p>
                                Registered accounts
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Passports</h3>

                            <strong>
                                {totalPassports}
                            </strong>

                            <p>
                                Passport records
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Visas</h3>

                            <strong>
                                {totalVisas}
                            </strong>

                            <p>
                                Visa records
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Uploaded Documents</h3>

                            <strong>
                                {totalDocuments}
                            </strong>

                            <p>
                                Stored travel documents
                            </p>
                        </div>

                    </div>


                    {/* Document Statistics */}

                    <div className="admin-section">

                        <div className="admin-section-header">
                            <div>
                                <h2>Document Statistics</h2>

                                <p>
                                    Overview of registered travel
                                    and compliance records.
                                </p>
                            </div>
                        </div>


                        <div className="admin-card-grid">

                            <div className="admin-card">
                                <h2>Insurance</h2>

                                <p className="analytics-number">
                                    {totalInsurances}
                                </p>

                                <span>
                                    Insurance records
                                </span>
                            </div>


                            <div className="admin-card">
                                <h2>Vaccinations</h2>

                                <p className="analytics-number">
                                    {totalVaccinations}
                                </p>

                                <span>
                                    Vaccination records
                                </span>
                            </div>


                            <div className="admin-card">
                                <h2>Travel History</h2>

                                <p className="analytics-number">
                                    {totalTravelHistory}
                                </p>

                                <span>
                                    Travel records
                                </span>
                            </div>


                            <div className="admin-card">
                                <h2>Reminders</h2>

                                <p className="analytics-number">
                                    {totalReminders}
                                </p>

                                <span>
                                    Reminder records
                                </span>
                            </div>

                        </div>

                    </div>


                    {/* System Overview */}

                    <div className="admin-card analytics-overview">

                        <h2>
                            System Overview
                        </h2>

                        <p>
                            The Smart Visa Travel Tracker currently
                            manages {totalUsers} registered user
                            account{totalUsers !== 1 ? "s" : ""}, with
                            {` ${totalPassports}`} passport
                            record{totalPassports !== 1 ? "s" : ""},
                            {` ${totalVisas}`} visa record
                            {totalVisas !== 1 ? "s" : ""}, and
                            {` ${totalDocuments}`} uploaded document
                            {totalDocuments !== 1 ? "s" : ""}.
                        </p>

                    </div>

                </>
            )}


            {!error && !analytics && (
                <p>
                    No analytics information available.
                </p>
            )}

        </div>
    );
}

export default Analytics;