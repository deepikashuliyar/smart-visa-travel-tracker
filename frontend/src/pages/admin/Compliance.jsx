import { useEffect, useState } from "react";
import { getCompliance } from "../../api/adminApi";
import Loading from "../../components/Loading";

function Compliance() {
    const [compliance, setCompliance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCompliance = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCompliance();

            setCompliance(data);
        } catch (error) {
            console.error("Error loading compliance:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load compliance information."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompliance();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const totalUsers = compliance?.totalUsers ?? 0;
    const compliantUsers = compliance?.compliantUsers ?? 0;
    const nonCompliantUsers = compliance?.nonCompliantUsers ?? 0;
    const expiringDocuments = compliance?.expiringDocuments ?? 0;

    const complianceRate =
        totalUsers > 0
            ? Math.round((compliantUsers / totalUsers) * 100)
            : 0;

    return (
        <div className="admin-page">

            <div className="documents-header">
                <div>
                    <h1>Compliance Monitoring</h1>

                    <p>
                        Monitor document validity and compliance
                        status across all registered users.
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={loadCompliance}
                >
                    Refresh
                </button>
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!error && compliance && (
                <>

                    {/* Compliance Overview */}

                    <div className="admin-stats-grid">

                        <div className="admin-stat-card">
                            <h3>Total Users</h3>

                            <strong>
                                {totalUsers}
                            </strong>

                            <p>
                                Registered users
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Compliant Users</h3>

                            <strong>
                                {compliantUsers}
                            </strong>

                            <p>
                                No expired documents
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Non-Compliant Users</h3>

                            <strong>
                                {nonCompliantUsers}
                            </strong>

                            <p>
                                Users requiring attention
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Expiring Documents</h3>

                            <strong>
                                {expiringDocuments}
                            </strong>

                            <p>
                                Expiring within 90 days
                            </p>
                        </div>

                    </div>


                    {/* Compliance Rate */}

                    <div className="admin-compliance-card">

                        <div className="admin-compliance-header">

                            <div>
                                <h2>Overall Compliance Rate</h2>

                                <p>
                                    Percentage of users without
                                    expired travel documents.
                                </p>
                            </div>

                            <strong>
                                {complianceRate}%
                            </strong>

                        </div>


                        <div className="compliance-progress">

                            <div
                                className="compliance-progress-bar"
                                style={{
                                    width: `${complianceRate}%`
                                }}
                            />

                        </div>


                        <div className="compliance-summary">

                            <span>
                                Compliant: {compliantUsers}
                            </span>

                            <span>
                                Attention Required: {nonCompliantUsers}
                            </span>

                        </div>

                    </div>


                    {/* Status Information */}

                    <div className="admin-card-grid">

                        <div className="admin-card">

                            <h2>
                                Document Status
                            </h2>

                            <p>
                                {expiringDocuments > 0
                                    ? `${expiringDocuments} document(s) are approaching expiry and may require renewal.`
                                    : "No documents are currently approaching expiry."
                                }
                            </p>

                        </div>


                        <div className="admin-card">

                            <h2>
                                Compliance Action
                            </h2>

                            <p>
                                Non-compliant users should review
                                their expired passport, visa,
                                insurance or vaccination records.
                            </p>

                        </div>

                    </div>

                </>
            )}

            {!error && !compliance && (
                <p>
                    No compliance information available.
                </p>
            )}

        </div>
    );
}

export default Compliance;