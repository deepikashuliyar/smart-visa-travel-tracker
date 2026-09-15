import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Passport() {
    const navigate = useNavigate();

    const [passport, setPassport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        passportNumber: "",
        country: "",
        issueDate: "",
        expiryDate: ""
    });

    const loadPassport = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/passport");

            const data = response.data.passport;

            setPassport(data);

            if (data) {
                setFormData({
                    passportNumber: data.passportNumber,
                    country: data.country,
                    issueDate: data.issueDate.split("T")[0],
                    expiryDate: data.expiryDate.split("T")[0]
                });
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setPassport(null);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to load passport"
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

        loadPassport();
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

            if (passport) {
                response = await api.put("/passport", formData);
            } else {
                response = await api.post("/passport", formData);
            }

            setMessage(response.data.message);
            setEditing(false);

            await loadPassport();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save passport"
            );
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your passport?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await api.delete("/passport");

            setMessage(response.data.message);
            setPassport(null);

            setFormData({
                passportNumber: "",
                country: "",
                issueDate: "",
                expiryDate: ""
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete passport"
            );
        }
    };

    if (loading) {
        return <p>Loading passport...</p>;
    }

    return (
        <div>
            <h1>Passport</h1>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!passport || editing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Passport Number</label>
                        <input
                            type="text"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
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
                        {passport ? "Update Passport" : "Add Passport"}
                    </button>

                    {passport && (
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            ) : (
                <div>
                    <h2>My Passport</h2>

                    <p>
                        <strong>Passport Number:</strong>{" "}
                        {passport.passportNumber}
                    </p>

                    <p>
                        <strong>Country:</strong>{" "}
                        {passport.country}
                    </p>

                    <p>
                        <strong>Issue Date:</strong>{" "}
                        {new Date(
                            passport.issueDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Expiry Date:</strong>{" "}
                        {new Date(
                            passport.expiryDate
                        ).toLocaleDateString()}
                    </p>

                    <button onClick={() => setEditing(true)}>
                        Edit Passport
                    </button>

                    <button onClick={handleDelete}>
                        Delete Passport
                    </button>
                </div>
            )}
        </div>
    );
}

export default Passport;