import { useEffect, useState } from "react";

import {
    getVisas,
    createVisa,
    updateVisa,
    deleteVisa
} from "../../api/visaApi";

import Loading from "../../components/Loading";

import {
    formatDate,
    getExpiryStatus,
    calculateDaysLeft
} from "../../utils/dateUtils";


function Visas() {

    const [visas, setVisas] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);


    const emptyForm = {
        country: "",
        visaType: "",
        visaNumber: "",
        issueDate: "",
        expiryDate: "",
        status: "VALID"
    };


    const [formData, setFormData] = useState(emptyForm);


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
       LOAD VISAS
    ===================================================== */

    const loadVisas = async () => {

        try {

            setLoading(true);

            const data = await getVisas();

            setVisas(
                Array.isArray(data.visas)
                    ? data.visas
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading visas:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load visa information."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadVisas();

    }, []);


    /* =====================================================
       ADD / UPDATE VISA
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            if (editingId) {

                await updateVisa(
                    editingId,
                    formData
                );

            } else {

                await createVisa(formData);

            }


            setFormData(emptyForm);

            setEditingId(null);

            setShowForm(false);

            await loadVisas();

        } catch (error) {

            console.error(
                "Error saving visa:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to save visa."
            );

        }

    };


    /* =====================================================
       EDIT VISA
    ===================================================== */

    const handleEdit = (visa) => {

        setEditingId(visa.id);

        setFormData({

            country:
                visa.country || "",

            visaType:
                visa.visaType || "",

            visaNumber:
                visa.visaNumber || "",

            issueDate:
                visa.issueDate
                    ? visa.issueDate.split("T")[0]
                    : "",

            expiryDate:
                visa.expiryDate
                    ? visa.expiryDate.split("T")[0]
                    : "",

            status:
                visa.status || "VALID"

        });

        setShowForm(true);

        setError("");

    };


    /* =====================================================
       DELETE VISA
    ===================================================== */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this visa?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        try {

            await deleteVisa(id);

            await loadVisas();

        } catch (error) {

            console.error(
                "Error deleting visa:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete visa."
            );

        }

    };


    /* =====================================================
       CANCEL FORM
    ===================================================== */

    const handleCancel = () => {

        setFormData(emptyForm);

        setEditingId(null);

        setShowForm(false);

        setError("");

    };


    /* =====================================================
       OPEN ADD FORM
    ===================================================== */

    const handleAddVisa = () => {

        setFormData(emptyForm);

        setEditingId(null);

        setError("");

        setShowForm(true);

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return <Loading />;

    }


    return (

        <div className="documents-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="documents-header">

                <div>

                    <h1>
                        Visas
                    </h1>

                    <p>
                        Manage your visas and track their expiry status.
                    </p>

                </div>


                {!showForm && (

                    <button
                        className="add-document-button"
                        onClick={handleAddVisa}
                    >
                        + Add Visa
                    </button>

                )}

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {/* =================================================
                ADD / EDIT VISA FORM
            ================================================= */}

            {showForm && (

                <div className="document-form-card">

                    <div className="document-form-header">

                        <div>

                            <h2>
                                {editingId
                                    ? "Edit Visa"
                                    : "Add Visa"}
                            </h2>

                            <p>
                                Enter the visa details below.
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
                        className="visa-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            {/* Country */}

                            <div className="form-group">

                                <label>
                                    Country
                                </label>

                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Example: France"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Visa Type */}

                            <div className="form-group">

                                <label>
                                    Visa Type
                                </label>

                                <input
                                    type="text"
                                    name="visaType"
                                    placeholder="Example: Tourist"
                                    value={formData.visaType}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Visa Number */}

                            <div className="form-group">

                                <label>
                                    Visa Number
                                </label>

                                <input
                                    type="text"
                                    name="visaNumber"
                                    placeholder="Optional"
                                    value={formData.visaNumber}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Status */}

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="VALID">
                                        Valid
                                    </option>

                                    <option value="EXPIRED">
                                        Expired
                                    </option>

                                    <option value="CANCELLED">
                                        Cancelled
                                    </option>

                                </select>

                            </div>


                            {/* Issue Date */}

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


                            {/* Expiry Date */}

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

                        </div>


                        {/* FORM BUTTONS */}

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
                                {editingId
                                    ? "Update Visa"
                                    : "Save Visa"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                VISA LIST
            ================================================= */}

            {!showForm && visas.length > 0 && (

                <div className="visa-list">

                    {visas.map((visa) => {

                        const daysLeft =
                            calculateDaysLeft(
                                visa.expiryDate
                            );


                        const expiryStatus =
                            getExpiryStatus(
                                visa.expiryDate
                            );


                        const displayStatus =
                            visa.status === "CANCELLED"
                                ? "Cancelled"
                                : expiryStatus;


                        return (

                            <div
                                className="visa-card"
                                key={visa.id}
                            >

                                {/* Visa Icon */}

                                <div className="visa-card-icon">
                                    📄
                                </div>


                                <div className="visa-card-main">

                                    {/* TOP */}

                                    <div className="visa-card-top">

                                        <div>

                                            <span className="visa-card-label">
                                                VISA
                                            </span>

                                            <h2>
                                                {visa.country ||
                                                    "Visa"}
                                            </h2>

                                            <p className="visa-type-text">
                                                {visa.visaType ||
                                                    "Visa"}
                                            </p>

                                        </div>


                                        <span
                                            className={`document-status ${displayStatus.toLowerCase()}`}
                                        >
                                            {displayStatus}
                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="visa-card-details">

                                        <div>

                                            <span>
                                                Visa Number
                                            </span>

                                            <strong>
                                                {visa.visaNumber ||
                                                    "Not provided"}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Issue Date
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    visa.issueDate
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Expiry Date
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    visa.expiryDate
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


                                    {/* ACTIONS */}

                                    <div className="visa-card-actions">

                                        <button
                                            className="edit-document-button"
                                            onClick={() =>
                                                handleEdit(visa)
                                            }
                                        >
                                            Edit Visa
                                        </button>


                                        <button
                                            className="delete-document-button"
                                            onClick={() =>
                                                handleDelete(
                                                    visa.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!showForm &&
                visas.length === 0 &&
                !error && (

                    <div className="documents-empty-state">

                        <div className="documents-empty-icon">
                            📄
                        </div>

                        <h2>
                            No Visas Added
                        </h2>

                        <p>
                            Add your visa information to keep
                            track of destination permissions and
                            expiry dates.
                        </p>

                        <button
                            className="add-document-button"
                            onClick={handleAddVisa}
                        >
                            + Add Visa
                        </button>

                    </div>

                )}

        </div>

    );

}


export default Visas;