import { useEffect, useState } from "react";

import {
    getVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination
} from "../../api/vaccinationApi";

import Loading from "../../components/Loading";

import {
    formatDate,
    getExpiryStatus,
    calculateDaysLeft
} from "../../utils/dateUtils";


function Vaccinations() {

    const [vaccinations, setVaccinations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);


    const emptyForm = {
        vaccineName: "",
        vaccinationDate: "",
        expiryDate: "",
        certificateNumber: ""
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
       LOAD VACCINATIONS
    ===================================================== */

    const loadVaccinations = async () => {

        try {

            setLoading(true);

            const data = await getVaccinations();

            setVaccinations(
                Array.isArray(data.vaccinations)
                    ? data.vaccinations
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading vaccinations:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load vaccination information."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadVaccinations();

    }, []);


    /* =====================================================
       ADD / UPDATE VACCINATION
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            if (editingId) {

                await updateVaccination(
                    editingId,
                    formData
                );

            } else {

                await createVaccination(
                    formData
                );

            }


            setFormData(emptyForm);

            setEditingId(null);

            setShowForm(false);

            await loadVaccinations();

        } catch (error) {

            console.error(
                "Error saving vaccination:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to save vaccination."
            );

        }

    };


    /* =====================================================
       EDIT VACCINATION
    ===================================================== */

    const handleEdit = (vaccination) => {

        setEditingId(vaccination.id);

        setFormData({

            vaccineName:
                vaccination.vaccineName || "",

            vaccinationDate:
                vaccination.vaccinationDate
                    ? vaccination.vaccinationDate.split("T")[0]
                    : "",

            expiryDate:
                vaccination.expiryDate
                    ? vaccination.expiryDate.split("T")[0]
                    : "",

            certificateNumber:
                vaccination.certificateNumber || ""

        });

        setShowForm(true);

        setError("");

    };


    /* =====================================================
       DELETE VACCINATION
    ===================================================== */

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this vaccination?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        try {

            await deleteVaccination(id);

            await loadVaccinations();

        } catch (error) {

            console.error(
                "Error deleting vaccination:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete vaccination."
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

    const handleAddVaccination = () => {

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
                        Vaccinations
                    </h1>

                    <p>
                        Manage your vaccination records and travel requirements.
                    </p>

                </div>


                {!showForm && (

                    <button
                        className="add-document-button"
                        onClick={handleAddVaccination}
                    >
                        + Add Vaccination
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
                ADD / EDIT FORM
            ================================================= */}

            {showForm && (

                <div className="document-form-card">

                    <div className="document-form-header">

                        <div>

                            <h2>
                                {editingId
                                    ? "Edit Vaccination"
                                    : "Add Vaccination"}
                            </h2>

                            <p>
                                Enter your vaccination record details below.
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
                        className="vaccination-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            {/* Vaccine Name */}

                            <div className="form-group">

                                <label>
                                    Vaccine Name
                                </label>

                                <input
                                    type="text"
                                    name="vaccineName"
                                    placeholder="Example: Yellow Fever"
                                    value={formData.vaccineName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Certificate Number */}

                            <div className="form-group">

                                <label>
                                    Certificate Number
                                </label>

                                <input
                                    type="text"
                                    name="certificateNumber"
                                    placeholder="Optional"
                                    value={formData.certificateNumber}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Vaccination Date */}

                            <div className="form-group">

                                <label>
                                    Vaccination Date
                                </label>

                                <input
                                    type="date"
                                    name="vaccinationDate"
                                    value={formData.vaccinationDate}
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
                                    ? "Update Vaccination"
                                    : "Save Vaccination"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                VACCINATION LIST
            ================================================= */}

            {!showForm &&
                vaccinations.length > 0 && (

                    <div className="vaccination-list">

                        {vaccinations.map((vaccination) => {

                            const hasExpiry =
                                Boolean(
                                    vaccination.expiryDate
                                );


                            const daysLeft =
                                hasExpiry
                                    ? calculateDaysLeft(
                                        vaccination.expiryDate
                                    )
                                    : null;


                            const expiryStatus =
                                hasExpiry
                                    ? getExpiryStatus(
                                        vaccination.expiryDate
                                    )
                                    : "Valid";


                            return (

                                <div
                                    className="vaccination-card"
                                    key={vaccination.id}
                                >

                                    {/* Icon */}

                                    <div className="vaccination-card-icon">
                                        💉
                                    </div>


                                    <div className="vaccination-card-main">

                                        {/* TOP */}

                                        <div className="vaccination-card-top">

                                            <div>

                                                <span className="vaccination-card-label">
                                                    VACCINATION
                                                </span>

                                                <h2>
                                                    {vaccination.vaccineName ||
                                                        "Vaccination"}
                                                </h2>

                                                <p className="vaccination-certificate-text">

                                                    Certificate:{" "}

                                                    {vaccination.certificateNumber ||
                                                        "Not provided"}

                                                </p>

                                            </div>


                                            <span
                                                className={`document-status ${expiryStatus.toLowerCase()}`}
                                            >
                                                {expiryStatus}
                                            </span>

                                        </div>


                                        {/* DETAILS */}

                                        <div className="vaccination-card-details">

                                            <div>

                                                <span>
                                                    Vaccine
                                                </span>

                                                <strong>
                                                    {vaccination.vaccineName ||
                                                        "Not provided"}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Vaccination Date
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        vaccination.vaccinationDate
                                                    )}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Expiry Date
                                                </span>

                                                <strong>
                                                    {hasExpiry
                                                        ? formatDate(
                                                            vaccination.expiryDate
                                                        )
                                                        : "No expiry date"}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Certificate
                                                </span>

                                                <strong>
                                                    {vaccination.certificateNumber ||
                                                        "Not provided"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* VALIDITY */}

                                        <div className="vaccination-validity">

                                            <span>
                                                Validity
                                            </span>

                                            <strong>

                                                {!hasExpiry

                                                    ? "No expiry date"

                                                    : daysLeft < 0

                                                        ? `${Math.abs(daysLeft)} days expired`

                                                        : `${daysLeft} days remaining`

                                                }

                                            </strong>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="vaccination-card-actions">

                                            <button
                                                className="edit-document-button"
                                                onClick={() =>
                                                    handleEdit(
                                                        vaccination
                                                    )
                                                }
                                            >
                                                Edit Vaccination
                                            </button>


                                            <button
                                                className="delete-document-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        vaccination.id
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
                vaccinations.length === 0 &&
                !error && (

                    <div className="documents-empty-state">

                        <div className="documents-empty-icon">
                            💉
                        </div>

                        <h2>
                            No Vaccination Records
                        </h2>

                        <p>
                            Add your vaccination records to keep
                            important health certificates ready
                            for your travels.
                        </p>

                        <button
                            className="add-document-button"
                            onClick={handleAddVaccination}
                        >
                            + Add Vaccination
                        </button>

                    </div>

                )}

        </div>

    );

}


export default Vaccinations;