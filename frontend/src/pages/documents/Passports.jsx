import { useEffect, useState } from "react";

import {
    getPassport,
    createPassport,
    updatePassport,
    deletePassport
} from "../../api/passportApi";

import DocumentCard from "../../components/DocumentCard";
import Loading from "../../components/Loading";

import {
    formatDate,
    getExpiryStatus,
    calculateDaysLeft
} from "../../utils/dateUtils";


function Passports() {

    const [passport, setPassport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editing, setEditing] = useState(false);


    const emptyForm = {
        passportNumber: "",
        country: "",
        issueDate: "",
        expiryDate: ""
    };


    const [formData, setFormData] = useState(emptyForm);


    /* =====================================================
       HANDLE INPUT CHANGE
    ===================================================== */

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    /* =====================================================
       ADD PASSPORT
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        try {

            const data = await createPassport(formData);

            setPassport(data.passport);

            setFormData(emptyForm);

            setShowForm(false);

        } catch (error) {

            console.error(
                "Error creating passport:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create passport."
            );

        }

    };


    /* =====================================================
       EDIT PASSPORT
    ===================================================== */

    const handleEdit = () => {

        if (!passport) {
            return;
        }

        setFormData({

            passportNumber:
                passport.passportNumber || "",

            country:
                passport.country || "",

            issueDate:
                passport.issueDate
                    ? passport.issueDate.split("T")[0]
                    : "",

            expiryDate:
                passport.expiryDate
                    ? passport.expiryDate.split("T")[0]
                    : ""

        });

        setEditing(true);

        setShowForm(true);

        setError("");

    };


    /* =====================================================
       UPDATE PASSPORT
    ===================================================== */

    const handleUpdate = async (event) => {

        event.preventDefault();

        setError("");

        try {

            const data = await updatePassport(
                passport.id,
                formData
            );

            setPassport(data.passport);

            setEditing(false);

            setShowForm(false);

            setFormData(emptyForm);

        } catch (error) {

            console.error(
                "Error updating passport:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update passport."
            );

        }

    };


    /* =====================================================
       DELETE PASSPORT
    ===================================================== */

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this passport?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        try {

            await deletePassport(passport.id);

            setPassport(null);

            setEditing(false);

            setShowForm(false);

            setFormData(emptyForm);

        } catch (error) {

            console.error(
                "Error deleting passport:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete passport."
            );

        }

    };


    /* =====================================================
       CANCEL FORM
    ===================================================== */

    const handleCancel = () => {

        setShowForm(false);

        setEditing(false);

        setFormData(emptyForm);

        setError("");

    };


    /* =====================================================
       LOAD PASSPORT
    ===================================================== */

    useEffect(() => {

        const loadPassport = async () => {

            try {

                const data = await getPassport();

                setPassport(
                    data.passport || null
                );

            } catch (error) {

                console.error(
                    "Error loading passport:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load passport information."
                );

            } finally {

                setLoading(false);

            }

        };

        loadPassport();

    }, []);


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
                        Passports
                    </h1>

                    <p>
                        Manage your passport information and expiry status.
                    </p>

                </div>


                <div className="documents-header-actions">

                    {!passport && !showForm && (

                        <button
                            className="add-document-button"
                            onClick={() => {

                                setEditing(false);

                                setFormData(emptyForm);

                                setError("");

                                setShowForm(true);

                            }}
                        >
                            + Add Passport
                        </button>

                    )}


                    {passport && !showForm && (

                        <button
                            className="add-document-button"
                            onClick={handleEdit}
                        >
                            Edit Passport
                        </button>

                    )}

                </div>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* =================================================
                ADD / EDIT PASSPORT FORM
            ================================================= */}

            {showForm && (

                <div className="document-form-card">

                    <div className="document-form-header">

                        <div>

                            <h2>
                                {editing
                                    ? "Edit Passport"
                                    : "Add Passport"}
                            </h2>

                            <p>
                                Enter your passport details below.
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
                        className="passport-form"
                        onSubmit={
                            editing
                                ? handleUpdate
                                : handleSubmit
                        }
                    >

                        <div className="form-grid">

                            {/* Passport Number */}

                            <div className="form-group">

                                <label>
                                    Passport Number
                                </label>

                                <input
                                    type="text"
                                    name="passportNumber"
                                    placeholder="Example: A1234567"
                                    value={
                                        formData.passportNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            {/* Country */}

                            <div className="form-group">

                                <label>
                                    Country
                                </label>

                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Example: India"
                                    value={
                                        formData.country
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            {/* Issue Date */}

                            <div className="form-group">

                                <label>
                                    Issue Date
                                </label>

                                <input
                                    type="date"
                                    name="issueDate"
                                    value={
                                        formData.issueDate
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        formData.expiryDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* FORM ACTIONS */}

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
                                    ? "Update Passport"
                                    : "Save Passport"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                PASSPORT CARD
            ================================================= */}

            {passport && !showForm && (

                <div className="passport-section">

                    <div className="passport-card-wrapper">

                        <div className="passport-card-icon">
                            🛂
                        </div>

                        <div className="passport-card-main">

                            <div className="passport-card-top">

                                <div>

                                    <span className="passport-card-label">
                                        PASSPORT
                                    </span>

                                    <h2>
                                        {passport.passportNumber ||
                                            "Passport"}
                                    </h2>

                                </div>


                                <span
                                    className={`document-status ${getExpiryStatus(
                                        passport.expiryDate
                                    ).toLowerCase()}`}
                                >
                                    {getExpiryStatus(
                                        passport.expiryDate
                                    )}
                                </span>

                            </div>


                            <div className="passport-card-details">

                                <div>

                                    <span>
                                        Country
                                    </span>

                                    <strong>
                                        {passport.country || "-"}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Issue Date
                                    </span>

                                    <strong>
                                        {formatDate(
                                            passport.issueDate
                                        )}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Expiry Date
                                    </span>

                                    <strong>
                                        {formatDate(
                                            passport.expiryDate
                                        )}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Validity
                                    </span>

                                    <strong>

                                        {calculateDaysLeft(
                                            passport.expiryDate
                                        ) !== null
                                            ? `${calculateDaysLeft(
                                                passport.expiryDate
                                            )} days remaining`
                                            : "Unknown"}

                                    </strong>

                                </div>

                            </div>


                            <div className="passport-card-actions">

                                <button
                                    className="edit-document-button"
                                    onClick={handleEdit}
                                >
                                    Edit Passport
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


                    {/* Existing reusable card removed here.
                       This prevents the duplicate passport
                       that was visible in your screenshot. */}

                </div>

            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!passport && !showForm && !error && (

                <div className="documents-empty-state">

                    <div className="documents-empty-icon">
                        🛂
                    </div>

                    <h2>
                        No Passport Added
                    </h2>

                    <p>
                        Add your passport information to start
                        monitoring its validity and expiry date.
                    </p>

                    <button
                        className="add-document-button"
                        onClick={() => {

                            setFormData(emptyForm);

                            setEditing(false);

                            setShowForm(true);

                        }}
                    >
                        + Add Passport
                    </button>

                </div>

            )}

        </div>

    );

}


export default Passports;