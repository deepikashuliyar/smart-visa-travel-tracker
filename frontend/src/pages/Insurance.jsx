import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Insurance() {
    const navigate = useNavigate();

    const [insurance, setInsurance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        provider: "",
        policyNumber: "",
        issueDate: "",
        expiryDate: "",
        coverage: ""
    });

    const loadInsurance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/insurance");

            const data = response.data.insurance;

            setInsurance(data);

            if (data) {
                setFormData({
                    provider: data.provider,
                    policyNumber: data.policyNumber,
                    issueDate: data.issueDate.split("T")[0],
                    expiryDate: data.expiryDate.split("T")[0],
                    coverage: data.coverage || ""
                });
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setInsurance(null);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to load insurance"
                );
            }
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

        loadInsurance();
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

            let response;

            if (insurance) {
                response = await api.put(
                    "/insurance",
                    formData
                );
            } else {
                response = await api.post(
                    "/insurance",
                    formData
                );
            }

            setMessage(response.data.message);
            setEditing(false);

            await loadInsurance();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save insurance"
            );
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your insurance?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await api.delete("/insurance");

            setMessage(response.data.message);
            setInsurance(null);

            setFormData({
                provider: "",
                policyNumber: "",
                issueDate: "",
                expiryDate: "",
                coverage: ""
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete insurance"
            );
        }
    };

    const handleCancel = () => {
        setEditing(false);

        if (insurance) {
            setFormData({
                provider: insurance.provider,
                policyNumber: insurance.policyNumber,
                issueDate: insurance.issueDate.split("T")[0],
                expiryDate: insurance.expiryDate.split("T")[0],
                coverage: insurance.coverage || ""
            });
        }
    };

    if (loading) {
        return <p>Loading insurance...</p>;
    }

    return (
        <div>
            <h1>Travel Insurance</h1>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!insurance || editing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Insurance Provider</label>
                        <input
                            type="text"
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            placeholder="Enter provider"
                            required
                        />
                    </div>

                    <div>
                        <label>Policy Number</label>
                        <input
                            type="text"
                            name="policyNumber"
                            value={formData.policyNumber}
                            onChange={handleChange}
                            placeholder="Enter policy number"
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

                    <div>
                        <label>Coverage</label>
                        <input
                            type="text"
                            name="coverage"
                            value={formData.coverage}
                            onChange={handleChange}
                            placeholder="Enter coverage details"
                        />
                    </div>

                    <button type="submit">
                        {insurance
                            ? "Update Insurance"
                            : "Add Insurance"}
                    </button>

                    {insurance && (
                        <button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            ) : (
                <div>
                    <h2>My Insurance</h2>

                    <p>
                        <strong>Provider:</strong>{" "}
                        {insurance.provider}
                    </p>

                    <p>
                        <strong>Policy Number:</strong>{" "}
                        {insurance.policyNumber}
                    </p>

                    <p>
                        <strong>Issue Date:</strong>{" "}
                        {new Date(
                            insurance.issueDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Expiry Date:</strong>{" "}
                        {new Date(
                            insurance.expiryDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Coverage:</strong>{" "}
                        {insurance.coverage || "Not specified"}
                    </p>

                    <button onClick={() => setEditing(true)}>
                        Edit Insurance
                    </button>

                    <button onClick={handleDelete}>
                        Delete Insurance
                    </button>
                </div>
            )}
        </div>
    );
}

export default Insurance;