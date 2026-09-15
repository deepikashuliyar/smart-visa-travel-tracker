import { useEffect, useState } from "react";

import {
    getInsurance,
    createInsurance,
    updateInsurance,
    deleteInsurance
} from "../../api/insuranceApi";

import Loading from "../../components/Loading";

import {
    formatDate,
    getExpiryStatus,
    calculateDaysLeft
} from "../../utils/dateUtils";


function Insurance() {

    const [insurance, setInsurance] = useState(null);

    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    const emptyForm = {
        provider: "",
        policyNumber: "",
        issueDate: "",
        expiryDate: "",
        coverage: ""
    };


    const [formData, setFormData] = useState(emptyForm);


    /* =====================================================
       LOAD INSURANCE
    ===================================================== */

    const loadInsurance = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getInsurance();

            setInsurance(
                data.insurance || null
            );

        } catch (error) {

            console.error(
                "Error loading insurance:",
                error
            );

            if (error.response?.status === 404) {

                setInsurance(null);

            } else {

                setError(
                    error.response?.data?.message ||
                    "Failed to load insurance information."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadInsurance();

    }, []);


    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    /* =====================================================
       OPEN ADD FORM
    ===================================================== */

    const handleAddInsurance = () => {

        setFormData(emptyForm);

        setEditing(false);

        setMessage("");

        setError("");

        setShowForm(true);

    };


    /* =====================================================
       EDIT INSURANCE
    ===================================================== */

    const handleEdit = () => {

        if (!insurance) {
            return;
        }

        setFormData({

            provider:
                insurance.provider || "",

            policyNumber:
                insurance.policyNumber || "",

            issueDate:
                insurance.issueDate
                    ? insurance.issueDate.split("T")[0]
                    : "",

            expiryDate:
                insurance.expiryDate
                    ? insurance.expiryDate.split("T")[0]
                    : "",

            coverage:
                insurance.coverage || ""

        });

        setEditing(true);

        setShowForm(true);

        setMessage("");

        setError("");

    };


    /* =====================================================
       ADD / UPDATE INSURANCE
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setMessage("");

        try {

            let data;

            if (editing) {

                data = await updateInsurance(
                    formData
                );

            } else {

                data = await createInsurance(
                    formData
                );

            }

            setMessage(
                data.message ||
                (
                    editing
                        ? "Insurance updated successfully."
                        : "Insurance added successfully."
                )
            );

            setEditing(false);

            setShowForm(false);

            setFormData(emptyForm);

            await loadInsurance();

        } catch (error) {

            console.error(
                "Error saving insurance:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to save insurance."
            );

        }

    };


    /* =====================================================
       DELETE INSURANCE
    ===================================================== */

    const handleDelete = async () => {

        if (!insurance) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete your insurance?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        setMessage("");

        try {

            const data = await deleteInsurance();

            setInsurance(null);

            setEditing(false);

            setShowForm(false);

            setFormData(emptyForm);

            setMessage(
                data.message ||
                "Insurance deleted successfully."
            );

        } catch (error) {

            console.error(
                "Error deleting insurance:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete insurance."
            );

        }

    };


    /* =====================================================
       CANCEL
    ===================================================== */

    const handleCancel = () => {

        setEditing(false);

        setShowForm(false);

        setFormData(emptyForm);

        setError("");

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return <Loading />;

    }


    /* =====================================================
       EXPIRY INFORMATION
    ===================================================== */

    const expiryStatus = insurance
        ? getExpiryStatus(insurance.expiryDate)
        : null;

    const daysLeft = insurance
        ? calculateDaysLeft(insurance.expiryDate)
        : null;


    return (

        <div className="documents-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="documents-header">

                <div>

                    <h1>
                        Travel Insurance
                    </h1>

                    <p>
                        Manage your travel insurance coverage
                        and expiry information.
                    </p>

                </div>


                {!showForm && (

                    <div className="documents-header-actions">

                        {!insurance && (

                            <button
                                className="add-document-button"
                                onClick={handleAddInsurance}
                            >
                                + Add Insurance
                            </button>

                        )}

                        {insurance && (

                            <button
                                className="add-document-button"
                                onClick={handleEdit}
                            >
                                Edit Insurance
                            </button>

                        )}

                    </div>

                )}

            </div>


            {/* =================================================
                MESSAGES
            ================================================= */}

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


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <div className="document-form-card">

                    <div className="document-form-header">

                        <div>

                            <h2>
                                {editing
                                    ? "Edit Travel Insurance"
                                    : "Add Travel Insurance"}
                            </h2>

                            <p>
                                Enter your insurance details below.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="form-close-button"
                            onClick={handleCancel}
                        >
                            ×
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Insurance Provider
                                </label>

                                <input
                                    type="text"
                                    name="provider"
                                    value={formData.provider}
                                    onChange={handleChange}
                                    placeholder="Example: Tata AIG"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Policy Number
                                </label>

                                <input
                                    type="text"
                                    name="policyNumber"
                                    value={formData.policyNumber}
                                    onChange={handleChange}
                                    placeholder="Enter policy number"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Issue Date
                                </label>

                                <input
                                    type="date"
                                    name="issueDate"
                                    value={formData.issueDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Expiry Date
                                </label>

                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Coverage
                                </label>

                                <input
                                    type="text"
                                    name="coverage"
                                    value={formData.coverage}
                                    onChange={handleChange}
                                    placeholder="Example: Medical, Trip Cancellation"
                                />

                            </div>

                        </div>


                        <div className="document-form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-document-button"
                            >
                                {editing
                                    ? "Update Insurance"
                                    : "Save Insurance"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                INSURANCE CARD
            ================================================= */}

            {insurance && !showForm && (

                <div className="insurance-card">

                    <div className="insurance-card-icon">
                        🛡️
                    </div>


                    <div className="insurance-card-main">

                        <div className="insurance-card-top">

                            <div>

                                <span className="insurance-card-label">
                                    TRAVEL INSURANCE
                                </span>

                                <h2>
                                    {insurance.provider ||
                                        "Insurance Provider"}
                                </h2>

                                <p>
                                    Policy:{" "}
                                    {insurance.policyNumber ||
                                        "Not provided"}
                                </p>

                            </div>


                            <span
                                className={`document-status ${
                                    expiryStatus
                                        ? expiryStatus.toLowerCase()
                                        : ""
                                }`}
                            >
                                {expiryStatus || "Unknown"}
                            </span>

                        </div>


                        <div className="insurance-card-details">

                            <div>

                                <span>
                                    Policy Number
                                </span>

                                <strong>
                                    {insurance.policyNumber ||
                                        "Not provided"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Issue Date
                                </span>

                                <strong>
                                    {formatDate(
                                        insurance.issueDate
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Expiry Date
                                </span>

                                <strong>
                                    {formatDate(
                                        insurance.expiryDate
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Validity
                                </span>

                                <strong>

                                    {daysLeft !== null
                                        ? daysLeft < 0
                                            ? `${Math.abs(daysLeft)} days expired`
                                            : `${daysLeft} days remaining`
                                        : "Unknown"}

                                </strong>

                            </div>

                        </div>


                        <div className="insurance-coverage">

                            <span>
                                Coverage
                            </span>

                            <strong>
                                {insurance.coverage ||
                                    "Not specified"}
                            </strong>

                        </div>


                        <div className="insurance-card-actions">

                            <button
                                className="edit-document-button"
                                onClick={handleEdit}
                            >
                                Edit Insurance
                            </button>


                            <button
                                className="delete-document-button"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!insurance &&
                !showForm &&
                !error && (

                    <div className="documents-empty-state">

                        <div className="documents-empty-icon">
                            🛡️
                        </div>

                        <h2>
                            No Insurance Added
                        </h2>

                        <p>
                            Add your travel insurance information
                            to monitor your coverage and expiry date.
                        </p>

                        <button
                            className="add-document-button"
                            onClick={handleAddInsurance}
                        >
                            + Add Insurance
                        </button>

                    </div>

                )}

        </div>

    );

}


export default Insurance;