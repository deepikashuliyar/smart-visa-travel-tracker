import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Visa() {
    const navigate = useNavigate();

    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
    country: "",
    visaType: "",
    visaNumber: "",
    issueDate: "",
    expiryDate: "",
    status: "Active"
});

    const loadVisas = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/visa");

            setVisas(response.data.visas || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load visas"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadVisas();
    }, [navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setMessage("");

            if (editing) {
                const response = await api.put(
                    `/visa/${editing}`,
                    formData
                );

                setMessage(response.data.message);
            } else {
                const response = await api.post(
                    "/visa",
                    formData
                );

                setMessage(response.data.message);
            }

            setFormData({
                country: "",
                visaType: "",
                visaNumber: "",
                issueDate: "",
                expiryDate: ""
            });

            setEditing(null);

            await loadVisas();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save visa"
            );
        }
    };

    const handleEdit = (visa) => {
        setEditing(visa.id);

        setFormData({
            country: visa.country,
            visaType: visa.visaType,
            visaNumber: visa.visaNumber,
            issueDate: visa.issueDate.split("T")[0],
            expiryDate: visa.expiryDate.split("T")[0],
            status: visa.status
        });

        setMessage("");
        setError("");
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this visa?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await api.delete(`/visa/${id}`);

            setMessage(response.data.message);

            await loadVisas();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete visa"
            );
        }
    };

    const handleCancel = () => {
        setEditing(null);

        setFormData({
            country: "",
            visaType: "",
            visaNumber: "",
            issueDate: "",
            expiryDate: ""
        });

        setMessage("");
        setError("");
    };

    if (loading) {
        return <p>Loading visas...</p>;
    }

    return (
        <div>
            <h1>Visa Management</h1>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        required
                    />
                </div>

                <div>
                    <label>Visa Type</label>
                    <input
                        type="text"
                        name="visaType"
                        value={formData.visaType}
                        onChange={handleChange}
                        placeholder="Tourist / Student / Work"
                        required
                    />
                </div>

                <div>
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <div>
                    <label>Visa Number</label>
                    <input
                        type="text"
                        name="visaNumber"
                        value={formData.visaNumber}
                        onChange={handleChange}
                        placeholder="Enter visa number"
                        required
                    />
                </div>

                <div>
                    <label>Issue Date</label>
                    <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    {editing ? "Update Visa" : "Add Visa"}
                </button>

                {editing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <hr />

            <h2>My Visas</h2>

            {visas.length === 0 ? (
                <p>No visas added yet.</p>
            ) : (
                visas.map((visa) => (
                    <div key={visa.id}>
                        <h3>{visa.country}</h3>

                        <p>
                            <strong>Visa Type:</strong>{" "}
                            {visa.visaType}
                        </p>

                        <p>
                            <strong>Visa Number:</strong>{" "}
                            {visa.visaNumber}
                        </p>

                        <p>
                            <strong>Issue Date:</strong>{" "}
                            {new Date(
                                visa.issueDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Expiry Date:</strong>{" "}
                            {new Date(
                                visa.expiryDate
                            ).toLocaleDateString()}
                        </p>

                        <button
                            onClick={() => handleEdit(visa)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(visa.id)}
                        >
                            Delete
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Visa;