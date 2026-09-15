import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";

function TravelHistory() {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        country: "",
        purpose: "",
        departureDate: "",
        returnDate: "",
        notes: ""
    });

    const loadTravelHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/travel-history");

            setTravels(response.data?.travels || []);
        } catch (err) {
            console.error("Error loading travel history:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load travel history."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTravelHistory();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            country: "",
            purpose: "",
            departureDate: "",
            returnDate: "",
            notes: ""
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setMessage("");

            if (editingId) {
                await api.put(
                    `/travel-history/${editingId}`,
                    formData
                );

                setMessage(
                    "Travel record updated successfully."
                );
            } else {
                await api.post(
                    "/travel-history",
                    formData
                );

                setMessage(
                    "Travel record added successfully."
                );
            }

            resetForm();

            await loadTravelHistory();
        } catch (err) {
            console.error(
                "Error saving travel record:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save travel record."
            );
        }
    };

    const handleEdit = (travel) => {
        setEditingId(travel.id);

        setFormData({
            country: travel.country || "",
            purpose: travel.purpose || "",

            departureDate:
                travel.departureDate
                    ? travel.departureDate.slice(0, 10)
                    : "",

            returnDate:
                travel.returnDate
                    ? travel.returnDate.slice(0, 10)
                    : "",

            notes: travel.notes || ""
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this travel record?"
        );

        if (!confirmed) return;

        try {
            setError("");
            setMessage("");

            await api.delete(
                `/travel-history/${id}`
            );

            setMessage(
                "Travel record deleted successfully."
            );

            await loadTravelHistory();
        } catch (err) {
            console.error(
                "Error deleting travel record:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to delete travel record."
            );
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

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
        <div className="travel-history-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="travel-history-header">

                <div>
                    <span className="travel-page-label">
                        TRAVEL MANAGEMENT
                    </span>

                    <h1>
                        Travel History
                    </h1>

                    <p>
                        Keep track of your previous and upcoming
                        international trips.
                    </p>
                </div>

                <button
                    className="add-document-button"
                    onClick={() => {
                        resetForm();

                        document
                            .getElementById(
                                "travel-record-form"
                            )
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });
                    }}
                >
                    + Add Travel Record
                </button>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {/* =========================
                FORM
            ========================= */}

            <div
                id="travel-record-form"
                className="travel-form-card"
            >

                <div className="travel-form-header">

                    <div>

                        <span className="travel-page-label">
                            TRIP DETAILS
                        </span>

                        <h2>
                            {editingId
                                ? "Edit Travel Record"
                                : "Add Travel Record"}
                        </h2>

                        <p>
                            Enter the details of your journey below.
                        </p>

                    </div>

                    <div className="travel-form-icon">
                        ✈️
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="travel-form-grid">

                        <div className="form-group">

                            <label>
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter country"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Purpose
                            </label>

                            <input
                                type="text"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                placeholder="Business, Tourism, Education..."
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Departure Date
                            </label>

                            <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Return Date
                            </label>

                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group travel-notes-group">

                            <label>
                                Notes
                            </label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Add any additional travel information..."
                                rows="4"
                            />

                        </div>

                    </div>


                    <div className="travel-form-actions">

                        <button
                            type="submit"
                            className="save-document-button"
                        >
                            {editingId
                                ? "Update Travel Record"
                                : "Add Travel Record"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>


            {/* =========================
                TRAVEL HISTORY
            ========================= */}

            <section className="travel-history-section">

                <div className="travel-section-header">

                    <div>
                        <span className="travel-page-label">
                            YOUR JOURNEYS
                        </span>

                        <h2>
                            My Travel History
                        </h2>
                    </div>

                    <span className="travel-record-count">
                        {travels.length} record
                        {travels.length !== 1
                            ? "s"
                            : ""}
                    </span>

                </div>


                {travels.length === 0 ? (

                    <div className="travel-empty-state">

                        <div className="travel-empty-icon">
                            ✈️
                        </div>

                        <h3>
                            No Travel Records
                        </h3>

                        <p>
                            Add your first travel record to start
                            tracking your trips.
                        </p>

                    </div>

                ) : (

                    <div className="travel-record-list">

                        {travels.map((travel) => (

                            <div
                                key={travel.id}
                                className="travel-record-card"
                            >

                                {/* CARD TOP */}

                                <div className="travel-record-top">

                                    <div className="travel-destination">

                                        <div className="travel-destination-icon">
                                            ✈️
                                        </div>

                                        <div>

                                            <span className="travel-page-label">
                                                DESTINATION
                                            </span>

                                            <h3>
                                                {travel.country}
                                            </h3>

                                            <p>
                                                {travel.purpose}
                                            </p>

                                        </div>

                                    </div>

                                    <span className="travel-record-badge">
                                        Travel Record
                                    </span>

                                </div>


                                {/* DETAILS */}

                                <div className="travel-record-details">

                                    <div>
                                        <span>
                                            Departure Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                travel.departureDate
                                            )}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Return Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                travel.returnDate
                                            )}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Purpose
                                        </span>

                                        <strong>
                                            {travel.purpose ||
                                                "N/A"}
                                        </strong>
                                    </div>

                                </div>


                                {/* NOTES */}

                                {travel.notes && (

                                    <div className="travel-record-notes">

                                        <span>
                                            Notes
                                        </span>

                                        <p>
                                            {travel.notes}
                                        </p>

                                    </div>

                                )}


                                {/* ACTIONS */}

                                <div className="travel-record-actions">

                                    <button
                                        className="edit-document-button"
                                        onClick={() =>
                                            handleEdit(
                                                travel
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-document-button"
                                        onClick={() =>
                                            handleDelete(
                                                travel.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default TravelHistory;