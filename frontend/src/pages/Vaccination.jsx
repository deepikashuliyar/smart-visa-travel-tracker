import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Vaccination() {
    const navigate = useNavigate();

    const [vaccination, setVaccination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        vaccineName: "",
        vaccinationDate: "",
        expiryDate: "",
        certificateNumber: ""
    });

    const loadVaccination = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/vaccination");

            const data = response.data.vaccination;

            setVaccination(data);

            if (data) {
                setFormData({
                    vaccineName: data.vaccineName,
                    vaccinationDate: data.vaccinationDate.split("T")[0],
                    expiryDate: data.expiryDate
                        ? data.expiryDate.split("T")[0]
                        : "",
                    certificateNumber: data.certificateNumber || ""
                });
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setVaccination(null);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to load vaccination"
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

        loadVaccination();
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

            if (vaccination) {
                response = await api.put(
                    "/vaccination",
                    formData
                );
            } else {
                response = await api.post(
                    "/vaccination",
                    formData
                );
            }

            setMessage(response.data.message);
            setEditing(false);

            await loadVaccination();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save vaccination"
            );
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your vaccination record?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await api.delete("/vaccination");

            setMessage(response.data.message);
            setVaccination(null);

            setFormData({
                vaccineName: "",
                vaccinationDate: "",
                expiryDate: "",
                certificateNumber: ""
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete vaccination"
            );
        }
    };

    const handleCancel = () => {
        setEditing(false);

        if (vaccination) {
            setFormData({
                vaccineName: vaccination.vaccineName,
                vaccinationDate:
                    vaccination.vaccinationDate.split("T")[0],
                expiryDate: vaccination.expiryDate
                    ? vaccination.expiryDate.split("T")[0]
                    : "",
                certificateNumber:
                    vaccination.certificateNumber || ""
            });
        }
    };

    if (loading) {
        return <p>Loading vaccination...</p>;
    }

    return (
        <div>
            <h1>Vaccination</h1>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!vaccination || editing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Vaccine Name</label>
                        <input
                            type="text"
                            name="vaccineName"
                            value={formData.vaccineName}
                            onChange={handleChange}
                            placeholder="Enter vaccine name"
                            required
                        />
                    </div>

                    <div>
                        <label>Vaccination Date</label>
                        <input
                            type="date"
                            name="vaccinationDate"
                            value={formData.vaccinationDate}
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
                        />
                    </div>

                    <div>
                        <label>Certificate Number</label>
                        <input
                            type="text"
                            name="certificateNumber"
                            value={formData.certificateNumber}
                            onChange={handleChange}
                            placeholder="Enter certificate number"
                        />
                    </div>

                    <button type="submit">
                        {vaccination
                            ? "Update Vaccination"
                            : "Add Vaccination"}
                    </button>

                    {vaccination && (
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
                    <h2>My Vaccination</h2>

                    <p>
                        <strong>Vaccine:</strong>{" "}
                        {vaccination.vaccineName}
                    </p>

                    <p>
                        <strong>Vaccination Date:</strong>{" "}
                        {new Date(
                            vaccination.vaccinationDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Expiry Date:</strong>{" "}
                        {vaccination.expiryDate
                            ? new Date(
                                vaccination.expiryDate
                            ).toLocaleDateString()
                            : "No expiry date"}
                    </p>

                    <p>
                        <strong>Certificate Number:</strong>{" "}
                        {vaccination.certificateNumber ||
                            "Not provided"}
                    </p>

                    <button onClick={() => setEditing(true)}>
                        Edit Vaccination
                    </button>

                    <button onClick={handleDelete}>
                        Delete Vaccination
                    </button>
                </div>
            )}
        </div>
    );
}

export default Vaccination;