import { useEffect, useState } from "react";

import {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    getReminderPreferences,
    updateReminderPreferences
} from "../api/reminderApi";

import ReminderCard from "../components/ReminderCard";
import Loading from "../components/Loading";
import { formatDate } from "../utils/dateUtils";

function Reminders() {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [preferences, setPreferences] = useState({
        passport: true,
        visa: true,
        insurance: true,
        vaccination: true,
        document: true
    });

    const [savingPreferences, setSavingPreferences] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        reminderDate: "",
        type: "DOCUMENT"
    });

    const loadReminders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getReminders();

            setReminders(Array.isArray(data?.reminders) ? data.reminders : []);
        } catch (error) {
            console.error("Error loading reminders:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load reminders."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadPreferences = async () => {
        try {
            const data = await getReminderPreferences();

            if (data?.preferences) {
                setPreferences((previous) => ({
                    ...previous,
                    ...data.preferences
                }));
            }
        } catch (error) {
            console.error("Error loading reminder preferences:", error);
        }
    };

    useEffect(() => {
        loadReminders();
        loadPreferences();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handlePreferenceChange = (event) => {
        const { name, checked } = event.target;

        setPreferences((previous) => ({
            ...previous,
            [name]: checked
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            reminderDate: "",
            type: "DOCUMENT"
        });

        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setMessage("");

            if (editingId) {
                await updateReminder(editingId, formData);
                setMessage("Reminder updated successfully.");
            } else {
                await createReminder(formData);
                setMessage("Reminder created successfully.");
            }

            resetForm();
            await loadReminders();
        } catch (error) {
            console.error("Error saving reminder:", error);

            setError(
                error.response?.data?.message ||
                "Failed to save reminder."
            );
        }
    };

    const handleEdit = (reminder) => {
        setEditingId(reminder.id);

        setFormData({
            title: reminder.title || "",
            description: reminder.description || "",
            reminderDate: reminder.reminderDate
                ? reminder.reminderDate.slice(0, 16)
                : "",
            type: reminder.type || "DOCUMENT"
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleComplete = async (id) => {
        try {
            setError("");
            setMessage("");

            await updateReminder(id, {
                isCompleted: true
            });

            setMessage("Reminder marked as completed.");

            await loadReminders();
        } catch (error) {
            console.error("Error completing reminder:", error);

            setError(
                error.response?.data?.message ||
                "Failed to complete reminder."
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reminder?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await deleteReminder(id);

            setMessage("Reminder deleted successfully.");

            await loadReminders();
        } catch (error) {
            console.error("Error deleting reminder:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete reminder."
            );
        }
    };

    const handleSavePreferences = async () => {
        try {
            setSavingPreferences(true);
            setError("");
            setMessage("");

            await updateReminderPreferences(preferences);

            setMessage("Reminder preferences updated successfully.");
        } catch (error) {
            console.error(
                "Error updating reminder preferences:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update reminder preferences."
            );
        } finally {
            setSavingPreferences(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="reminders-page">

            {/* =========================
                PAGE HEADER
            ========================= */}
            <div className="documents-header">
                <div>
                    <h1>Reminders</h1>

                    <p>
                        Manage your travel document expiry reminders and
                        notification preferences.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={() => {
                        resetForm();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }}
                >
                    + Add Reminder
                </button>
            </div>


            {/* =========================
                MESSAGES
            ========================= */}
            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}


            {/* =========================
                ADD / EDIT FORM
            ========================= */}
            <div className="reminder-form-card">

                <h2>
                    {editingId
                        ? "Edit Reminder"
                        : "Create New Reminder"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">
                            Reminder Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter reminder title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter reminder description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="reminderDate">
                            Reminder Date
                        </label>

                        <input
                            id="reminderDate"
                            name="reminderDate"
                            type="datetime-local"
                            value={formData.reminderDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="type">
                            Reminder Type
                        </label>

                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            <option value="DOCUMENT">
                                Document
                            </option>

                            <option value="PASSPORT">
                                Passport
                            </option>

                            <option value="VISA">
                                Visa
                            </option>

                            <option value="INSURANCE">
                                Insurance
                            </option>

                            <option value="VACCINATION">
                                Vaccination
                            </option>

                            <option value="TRAVEL">
                                Travel
                            </option>

                            <option value="OTHER">
                                Other
                            </option>
                        </select>
                    </div>


                    <div className="form-actions">

                        <button
                            type="submit"
                            className="reminder-submit-button"
                        >
                            {editingId
                                ? "Update Reminder"
                                : "Add Reminder"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="reminder-cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>


            {/* =========================
                REMINDER LIST
            ========================= */}
            <section className="reminders-section">

                <div className="reminders-section-header">
                    <h2>
                        My Reminders
                    </h2>
                </div>


                {reminders.length === 0 ? (

                    <div className="reminder-empty-state">

                        <div className="reminder-empty-icon">
                            🔔
                        </div>

                        <h3>
                            No Reminders Yet
                        </h3>

                        <p>
                            Add a reminder to keep track of important
                            travel document dates.
                        </p>

                    </div>

                ) : (

                    <div className="reminders-list">

                        {reminders.map((reminder) => (

                            <div
                                key={reminder.id}
                                className={`reminder-page-card ${
                                    reminder.isCompleted
                                        ? "completed"
                                        : ""
                                }`}
                            >

                                <div className="reminder-page-card-top">

                                    <div className="reminder-page-icon">
                                        🔔
                                    </div>


                                    <div className="reminder-page-content">

                                        <h3>
                                            {reminder.title}
                                        </h3>

                                        <p>
                                            {reminder.description ||
                                                "No description provided."}
                                        </p>

                                        <p className="reminder-date">
                                            📅{" "}
                                            {reminder.reminderDate
                                                ? formatDate(
                                                      reminder.reminderDate
                                                  )
                                                : "No date"}
                                        </p>


                                        <span className="reminder-type-badge">
                                            {reminder.type ||
                                                "DOCUMENT"}
                                        </span>


                                        {reminder.isCompleted && (
                                            <span className="reminder-completed-badge">
                                                Completed
                                            </span>
                                        )}

                                    </div>

                                </div>


                                <div className="reminder-page-actions">

                                    {!reminder.isCompleted && (
                                        <button
                                            type="button"
                                            className="reminder-action-button reminder-complete-button"
                                            onClick={() =>
                                                handleComplete(
                                                    reminder.id
                                                )
                                            }
                                        >
                                            ✓ Complete
                                        </button>
                                    )}


                                    <button
                                        type="button"
                                        className="reminder-action-button reminder-edit-button"
                                        onClick={() =>
                                            handleEdit(reminder)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="reminder-action-button reminder-delete-button"
                                        onClick={() =>
                                            handleDelete(reminder.id)
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


            {/* =========================
                REMINDER PREFERENCES
            ========================= */}
            <section className="reminder-preferences">

                <h2>
                    Reminder Preferences
                </h2>

                <p>
                    Choose which document categories should generate
                    expiry reminders.
                </p>


                <div className="reminder-preferences-grid">

                    <div className="reminder-preference-item">

                        <input
                            id="passportPreference"
                            name="passport"
                            type="checkbox"
                            checked={preferences.passport}
                            onChange={handlePreferenceChange}
                        />

                        <label htmlFor="passportPreference">
                            Passport reminders
                        </label>

                    </div>


                    <div className="reminder-preference-item">

                        <input
                            id="visaPreference"
                            name="visa"
                            type="checkbox"
                            checked={preferences.visa}
                            onChange={handlePreferenceChange}
                        />

                        <label htmlFor="visaPreference">
                            Visa reminders
                        </label>

                    </div>


                    <div className="reminder-preference-item">

                        <input
                            id="insurancePreference"
                            name="insurance"
                            type="checkbox"
                            checked={preferences.insurance}
                            onChange={handlePreferenceChange}
                        />

                        <label htmlFor="insurancePreference">
                            Insurance reminders
                        </label>

                    </div>


                    <div className="reminder-preference-item">

                        <input
                            id="vaccinationPreference"
                            name="vaccination"
                            type="checkbox"
                            checked={preferences.vaccination}
                            onChange={handlePreferenceChange}
                        />

                        <label htmlFor="vaccinationPreference">
                            Vaccination reminders
                        </label>

                    </div>


                    <div className="reminder-preference-item">

                        <input
                            id="documentPreference"
                            name="document"
                            type="checkbox"
                            checked={preferences.document}
                            onChange={handlePreferenceChange}
                        />

                        <label htmlFor="documentPreference">
                            Uploaded document reminders
                        </label>

                    </div>

                </div>


                <button
                    type="button"
                    className="reminder-save-button"
                    onClick={handleSavePreferences}
                    disabled={savingPreferences}
                >
                    {savingPreferences
                        ? "Saving..."
                        : "Save Preferences"}
                </button>

            </section>

        </div>
    );
}

export default Reminders;