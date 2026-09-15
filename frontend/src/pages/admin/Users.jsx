import { useEffect, useState } from "react";

import { getUsers } from "../../api/adminApi";
import Loading from "../../components/Loading";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getUsers();

                setUsers(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                console.error(
                    "Error loading users:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load users."
                );
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="admin-page">

            <div className="documents-header">

                <div>
                    <h1>Users</h1>

                    <p>
                        Manage and monitor registered users
                        in the system.
                    </p>
                </div>

            </div>


            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}


            {!error && users.length === 0 && (
                <div className="admin-empty-state">
                    <h3>No Users Found</h3>

                    <p>
                        There are currently no registered
                        users in the system.
                    </p>
                </div>
            )}


            {!error && users.length > 0 && (

                <div className="admin-table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Registered</th>
                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        #{user.id}
                                    </td>

                                    <td>
                                        <strong>
                                            {user.name || "N/A"}
                                        </strong>
                                    </td>

                                    <td>
                                        {user.email || "N/A"}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                user.role === "ADMIN"
                                                    ? "admin-role-badge"
                                                    : "user-role-badge"
                                            }
                                        >
                                            {user.role || "USER"}
                                        </span>
                                    </td>

                                    <td>
                                        {formatDate(
                                            user.createdAt
                                        )}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default Users;