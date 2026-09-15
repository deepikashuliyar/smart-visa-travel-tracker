import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAnalytics } from "../../api/adminApi";
import Loading from "../../components/Loading";

function AdminDashboard() {
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
            console.error(
                "Error loading admin analytics:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load admin dashboard."
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

    return (
        <div className="admin-dashboard">

            <div className="documents-header">

                <div>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage users, monitor compliance and
                        view system analytics.
                    </p>
                </div>

            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}


            {analytics && (

                <div className="admin-stats-grid">

                    <div className="admin-stat-card">
                        <h3>Total Users</h3>
                        <strong>
                            {analytics.totalUsers}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Passports</h3>
                        <strong>
                            {analytics.totalPassports}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Visas</h3>
                        <strong>
                            {analytics.totalVisas}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Insurance</h3>
                        <strong>
                            {analytics.totalInsurances}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Vaccinations</h3>
                        <strong>
                            {analytics.totalVaccinations}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Travel History</h3>
                        <strong>
                            {analytics.totalTravelHistory}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Reminders</h3>
                        <strong>
                            {analytics.totalReminders}
                        </strong>
                    </div>

                    <div className="admin-stat-card">
                        <h3>Uploaded Documents</h3>
                        <strong>
                            {analytics.totalDocuments}
                        </strong>
                    </div>

                </div>

            )}


            <div className="admin-card-grid">

                <Link
                    to="/admin/users"
                    className="admin-card"
                >
                    <h2>Users</h2>

                    <p>
                        Manage registered users and their
                        accounts.
                    </p>
                </Link>


                <Link
                    to="/admin/compliance"
                    className="admin-card"
                >
                    <h2>Compliance</h2>

                    <p>
                        Monitor document and travel
                        compliance.
                    </p>
                </Link>


                <Link
                    to="/admin/analytics"
                    className="admin-card"
                >
                    <h2>Analytics</h2>

                    <p>
                        View detailed system statistics
                        and important metrics.
                    </p>
                </Link>

            </div>

        </div>
    );
}

export default AdminDashboard;