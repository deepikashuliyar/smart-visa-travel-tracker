import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../api/authApi";
import { getPassport } from "../api/passportApi";
import { getVisas } from "../api/visaApi";
import { getInsurance } from "../api/insuranceApi";
import { getVaccinations } from "../api/vaccinationApi";
import { getReminders } from "../api/reminderApi";
import { getTravelHistory } from "../api/travelApi";
import { getDocuments } from "../api/documentApi";

import {
    calculateDaysLeft,
    formatDate
} from "../utils/dateUtils";

import Loading from "../components/Loading";


/* =========================================================
   SCHENGEN COUNTRIES
========================================================= */

const SCHENGEN_COUNTRIES = [
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland"
];


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const normalizeCountry = (country) => {
    return country
        ?.trim()
        .toLowerCase();
};


const isSchengenCountry = (country) => {
    if (!country) {
        return false;
    }

    return SCHENGEN_COUNTRIES.some(
        (schengenCountry) =>
            normalizeCountry(schengenCountry) ===
            normalizeCountry(country)
    );
};


/*
   Calculates the number of days from ONE trip
   that fall inside the current 180-day window.

   Departure and return dates are both counted.
*/

const calculateTripDaysInWindow = (
    departureDate,
    returnDate
) => {
    if (!departureDate) {
        return 0;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const windowStart = new Date(today);

    windowStart.setDate(
        windowStart.getDate() - 179
    );

    const departure = new Date(
        departureDate
    );

    departure.setHours(
        0,
        0,
        0,
        0
    );

    const tripEnd = returnDate
        ? new Date(returnDate)
        : today;

    tripEnd.setHours(
        0,
        0,
        0,
        0
    );

    const start =
        departure > windowStart
            ? departure
            : windowStart;

    const end =
        tripEnd < today
            ? tripEnd
            : today;

    if (end < start) {
        return 0;
    }

    const difference =
        end.getTime() -
        start.getTime();

    return (
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1
    );
};


/*
   Creates a date interval for a trip
   inside the current 180-day window.
*/

const getSchengenTripInterval = (
    departureDate,
    returnDate
) => {
    if (!departureDate) {
        return null;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const windowStart = new Date(today);

    windowStart.setDate(
        windowStart.getDate() - 179
    );

    const departure = new Date(
        departureDate
    );

    departure.setHours(
        0,
        0,
        0,
        0
    );

    const tripEnd = returnDate
        ? new Date(returnDate)
        : today;

    tripEnd.setHours(
        0,
        0,
        0,
        0
    );

    const start =
        departure > windowStart
            ? departure
            : windowStart;

    const end =
        tripEnd < today
            ? tripEnd
            : today;

    if (end < start) {
        return null;
    }

    return {
        start,
        end
    };
};


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {

    const navigate = useNavigate();


    /* =====================================================
       STATE
    ===================================================== */

    const [user, setUser] =
        useState(null);

    const [passport, setPassport] =
        useState(null);

    const [visas, setVisas] =
        useState([]);

    const [insurances, setInsurances] =
        useState([]);

    const [vaccinations, setVaccinations] =
        useState([]);

    const [reminders, setReminders] =
        useState([]);

    const [travelHistory, setTravelHistory] =
        useState([]);

    const [uploadedDocuments, setUploadedDocuments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =====================================================
       LOAD DASHBOARD DATA
    ===================================================== */

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);

                setError("");


                const [
                    userData,
                    passportData,
                    visaData,
                    insuranceData,
                    vaccinationData,
                    reminderData,
                    travelData,
                    documentData
                ] = await Promise.all([

                    getCurrentUser(),

                    getPassport(),

                    getVisas(),

                    getInsurance(),

                    getVaccinations(),

                    getReminders(),

                    getTravelHistory(),

                    getDocuments()

                ]);


                /* USER */

                setUser(
                    userData.user ||
                    userData
                );


                /* PASSPORT */

                setPassport(
                    passportData.passport ||
                    null
                );


                /* VISAS */

                setVisas(
                    Array.isArray(
                        visaData.visas
                    )
                        ? visaData.visas
                        : []
                );


                /* INSURANCE */

                setInsurances(
                    Array.isArray(
                        insuranceData.insurances
                    )
                        ? insuranceData.insurances
                        : []
                );


                /* VACCINATIONS */

                setVaccinations(
                    Array.isArray(
                        vaccinationData.vaccinations
                    )
                        ? vaccinationData.vaccinations
                        : []
                );


                /* REMINDERS */

                setReminders(
                    Array.isArray(
                        reminderData
                    )
                        ? reminderData
                        : Array.isArray(
                            reminderData.reminders
                        )
                            ? reminderData.reminders
                            : []
                );


                /* TRAVEL HISTORY */

                setTravelHistory(
                    Array.isArray(
                        travelData
                    )
                        ? travelData
                        : Array.isArray(
                            travelData.travels
                        )
                            ? travelData.travels
                            : []
                );


                /* UPLOADED DOCUMENTS */

                setUploadedDocuments(
                    Array.isArray(
                        documentData.documents
                    )
                        ? documentData.documents
                        : []
                );

            }

            catch (error) {

                console.error(
                    "Dashboard loading error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return <Loading />;

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        return (

            <div className="dashboard">

                <div className="dashboard-panel">

                    <h2>
                        Unable to load dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="dashboard-ai-button"
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    /* =====================================================
       DOCUMENT LIST
    ===================================================== */

    const allDocuments = [];


    /* PASSPORT */

    if (passport) {

        allDocuments.push({

            id:
                `passport-${passport.id}`,

            title:
                "Passport",

            type:
                "Passport",

            expiryDate:
                passport.expiryDate,

            path:
                "/documents/passports"

        });

    }


    /* VISAS */

    visas.forEach(
        (visa) => {

            allDocuments.push({

                id:
                    `visa-${visa.id}`,

                title:
                    visa.country
                        ? `${visa.country} Visa`
                        : "Visa",

                type:
                    "Visa",

                expiryDate:
                    visa.expiryDate,

                path:
                    "/documents/visas"

            });

        }
    );


    /* INSURANCE */

    insurances.forEach(
        (insurance) => {

            allDocuments.push({

                id:
                    `insurance-${insurance.id}`,

                title:
                    insurance.provider
                        ? `${insurance.provider} Insurance`
                        : "Travel Insurance",

                type:
                    "Insurance",

                expiryDate:
                    insurance.expiryDate,

                path:
                    "/documents/insurance"

            });

        }
    );


    /* VACCINATIONS */

    vaccinations.forEach(
        (vaccination) => {

            if (
                vaccination.expiryDate
            ) {

                allDocuments.push({

                    id:
                        `vaccination-${vaccination.id}`,

                    title:
                        vaccination.vaccineName,

                    type:
                        "Vaccination",

                    expiryDate:
                        vaccination.expiryDate,

                    path:
                        "/documents/vaccinations"

                });

            }

        }
    );


    /* UPLOADED DOCUMENTS */

    uploadedDocuments.forEach(
        (document) => {

            allDocuments.push({

                id:
                    `uploaded-${document.id}`,

                title:
                    document.fileName ||
                    "Travel Document",

                type:
                    document.documentType ||
                    "Document",

                expiryDate:
                    document.expiryDate,

                path:
                    "/documents"

            });

        }
    );


    /* =====================================================
       DOCUMENT COUNTS
    ===================================================== */

    const totalDocuments =
        allDocuments.length;


    const validDocuments =
        allDocuments.filter(
            (document) => {

                const daysLeft =
                    calculateDaysLeft(
                        document.expiryDate
                    );

                return (
                    daysLeft !== null &&
                    daysLeft > 90
                );

            }
        );


    const expiringDocuments =
        allDocuments.filter(
            (document) => {

                const daysLeft =
                    calculateDaysLeft(
                        document.expiryDate
                    );

                return (
                    daysLeft !== null &&
                    daysLeft >= 0 &&
                    daysLeft <= 90
                );

            }
        );


    const expiredDocuments =
        allDocuments.filter(
            (document) => {

                const daysLeft =
                    calculateDaysLeft(
                        document.expiryDate
                    );

                return (
                    daysLeft !== null &&
                    daysLeft < 0
                );

            }
        );


    /* =====================================================
       URGENT DOCUMENTS
    ===================================================== */

    const urgentDocuments = [

        ...expiredDocuments,

        ...expiringDocuments

    ]

        .sort(
            (a, b) => {

                return (

                    calculateDaysLeft(
                        a.expiryDate
                    ) -

                    calculateDaysLeft(
                        b.expiryDate
                    )

                );

            }
        )

        .slice(0, 5);


    /* =====================================================
       REMINDERS
    ===================================================== */

    const pendingReminders =
        reminders

            .filter(
                (reminder) =>
                    !reminder.isCompleted
            )

            .sort(
                (a, b) =>
                    new Date(
                        a.reminderDate
                    ) -
                    new Date(
                        b.reminderDate
                    )
            )

            .slice(0, 5);


    /* =====================================================
       SCHENGEN TRIPS
    ===================================================== */

    const schengenTrips =
        travelHistory.filter(
            (travel) =>
                isSchengenCountry(
                    travel.country
                )
        );


    /* =====================================================
       SCHENGEN OVERLAP-SAFE CALCULATION
    ===================================================== */

    const schengenIntervals =
        schengenTrips
            .map(
                (travel) =>
                    getSchengenTripInterval(
                        travel.departureDate,
                        travel.returnDate
                    )
            )
            .filter(Boolean);


    /*
       Sort intervals by starting date.
    */

    schengenIntervals.sort(
        (a, b) =>
            a.start.getTime() -
            b.start.getTime()
    );


    /*
       Merge overlapping intervals.
    */

    const mergedSchengenIntervals = [];


    schengenIntervals.forEach(
        (interval) => {

            const last =
                mergedSchengenIntervals[
                    mergedSchengenIntervals.length - 1
                ];


            if (!last) {

                mergedSchengenIntervals.push({
                    start: interval.start,
                    end: interval.end
                });

                return;

            }


            const nextDayAfterLast =
                new Date(last.end);

            nextDayAfterLast.setDate(
                nextDayAfterLast.getDate() + 1
            );


            if (
                interval.start >
                nextDayAfterLast
            ) {

                mergedSchengenIntervals.push({
                    start: interval.start,
                    end: interval.end
                });

                return;

            }


            if (
                interval.end >
                last.end
            ) {

                last.end =
                    interval.end;

            }

        }
    );


    /*
       Count unique Schengen days.
    */

    let schengenDays = 0;


    mergedSchengenIntervals.forEach(
        (interval) => {

            const difference =
                interval.end.getTime() -
                interval.start.getTime();

            schengenDays +=
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                ) + 1;

        }
    );


    /* =====================================================
       SCHENGEN LIMIT
    ===================================================== */

    const schengenUsed =
        Math.min(
            schengenDays,
            90
        );


    const schengenRemaining =
        Math.max(
            90 - schengenUsed,
            0
        );


    const schengenPercentage =
        Math.min(
            Math.round(
                (schengenUsed / 90) *
                100
            ),
            100
        );


    /* =====================================================
       SCHENGEN STATUS
    ===================================================== */

    let schengenStatus =
        "No Schengen travel records have been added yet.";


    if (schengenUsed > 0) {

        schengenStatus =
            `${schengenRemaining} day${
                schengenRemaining === 1
                    ? ""
                    : "s"
            } remaining in the current 90/180 window.`;

    }


    if (schengenUsed >= 90) {

        schengenStatus =
            "You have reached the 90-day Schengen limit.";

    }


    /* =====================================================
       RETURN UI
    ===================================================== */

    return (

        <div className="dashboard">


            {/* =================================================
                ALERT BANNER
            ================================================= */}

            {(expiredDocuments.length > 0 ||
                expiringDocuments.length > 0) && (

                <div className="dashboard-alert-banner">

                    <span>
                        ⚠️
                    </span>

                    <strong>
                        Action Required:
                    </strong>

                    <span>

                        You have{" "}

                        {
                            expiredDocuments.length +
                            expiringDocuments.length
                        }

                        {" "}

                        travel document
                        {
                            expiredDocuments.length +
                            expiringDocuments.length !== 1
                                ? "s"
                                : ""
                        }

                        {" "}
                        expiring within 90 days
                        or overdue for renewal.

                    </span>

                    <button
                        onClick={() =>
                            document
                                .getElementById(
                                    "expiry-alerts"
                                )
                                ?.scrollIntoView({
                                    behavior:
                                        "smooth"
                                })
                        }
                    >

                        View Urgent Alerts →

                    </button>

                </div>

            )}


            {/* =================================================
                WELCOME
            ================================================= */}

            <section className="dashboard-welcome">

                <div className="dashboard-welcome-content">

                    <span className="dashboard-profile-badge">

                        ✨ Active Travel Profile

                    </span>


                    <h1>

                        Welcome back,{" "}

                        {
                            user?.name ||
                            "Traveler"
                        }

                    </h1>


                    <p>

                        Real-time compliance monitoring
                        across {totalDocuments} stored
                        travel document
                        {
                            totalDocuments !== 1
                                ? "s"
                                : ""
                        },

                        {" "}
                        Schengen 90/180 tracking,
                        and automated expiry alerts.

                    </p>

                </div>


                <div className="dashboard-welcome-actions">

                    <button
                        className="dashboard-refresh-button"
                        onClick={() =>
                            window.location.reload()
                        }
                    >

                        ↻ Scan & Refresh

                    </button>


                    <button
                        className="dashboard-ai-button"
                        onClick={() =>
                            navigate(
                                "/documents"
                            )
                        }
                    >

                        ✨ AI Smart Scan

                    </button>

                </div>

            </section>


            {/* =================================================
                KPI CARDS
            ================================================= */}

            <section className="dashboard-kpi-grid">


                {/* TOTAL DOCUMENTS */}

                <div className="dashboard-kpi-card">

                    <div className="dashboard-kpi-top">

                        <span>
                            TOTAL DOCUMENTS
                        </span>

                        <div className="dashboard-kpi-icon">
                            📁
                        </div>

                    </div>


                    <div className="dashboard-kpi-number">

                        {totalDocuments}

                    </div>


                    <p>

                        {
                            passport
                                ? "1 Passport"
                                : "0 Passports"
                        }

                        {" · "}

                        {visas.length}

                        {" "}

                        {
                            visas.length === 1
                                ? "Visa"
                                : "Visas"
                        }

                    </p>


                    <span
                        className="dashboard-kpi-link"
                        onClick={() =>
                            navigate(
                                "/documents"
                            )
                        }
                    >

                        Manage documents →

                    </span>

                </div>


                {/* VALID */}

                <div className="dashboard-kpi-card">

                    <div className="dashboard-kpi-top">

                        <span>
                            VALID & ACTIVE
                        </span>

                        <div className="dashboard-kpi-icon success">
                            ✓
                        </div>

                    </div>


                    <div className="dashboard-kpi-number success-text">

                        {validDocuments.length}

                    </div>


                    <span className="dashboard-status-badge success">

                        Ready for travel

                    </span>


                    <p>

                        Documents with more than
                        90 days validity

                    </p>

                </div>


                {/* EXPIRING */}

                <div className="dashboard-kpi-card">

                    <div className="dashboard-kpi-top">

                        <span>
                            EXPIRING SOON (&lt;90D)
                        </span>

                        <div className="dashboard-kpi-icon warning">
                            ◷
                        </div>

                    </div>


                    <div className="dashboard-kpi-number warning-text">

                        {expiringDocuments.length}

                    </div>


                    <span className="dashboard-status-badge warning">

                        Renewal Recommended

                    </span>


                    <p>

                        Documents requiring
                        attention

                    </p>

                </div>


                {/* EXPIRED */}

                <div className="dashboard-kpi-card">

                    <div className="dashboard-kpi-top">

                        <span>
                            EXPIRED DOCUMENTS
                        </span>

                        <div className="dashboard-kpi-icon danger">
                            !
                        </div>

                    </div>


                    <div className="dashboard-kpi-number danger-text">

                        {expiredDocuments.length}

                    </div>


                    <span className="dashboard-status-badge danger">

                        Invalid for entry

                    </span>


                    <p>

                        Renew or replace
                        expired records

                    </p>

                </div>

            </section>


            {/* =================================================
                MAIN GRID
            ================================================= */}

            <section className="dashboard-main-grid">


                {/* EXPIRY ALERTS */}

                <div
                    className="dashboard-panel"
                    id="expiry-alerts"
                >

                    <div className="dashboard-panel-header">

                        <div>

                            <h2>

                                ⚠️ Expiry Timeline &
                                Urgent Alerts

                            </h2>


                            <p>

                                Documents requiring renewal
                                or travel authorization review

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    "/reminders"
                                )
                            }
                        >

                            Automated Email Alerts →

                        </button>

                    </div>


                    {urgentDocuments.length === 0 ? (

                        <div className="dashboard-empty">

                            <div>
                                ✓
                            </div>

                            <h3>
                                All documents are up to date
                            </h3>

                            <p>
                                No documents require
                                immediate attention.
                            </p>

                        </div>

                    ) : (

                        <div className="dashboard-alert-list">

                            {urgentDocuments.map(
                                (document) => {

                                    const daysLeft =
                                        calculateDaysLeft(
                                            document.expiryDate
                                        );

                                    const expired =
                                        daysLeft < 0;


                                    return (

                                        <div
                                            className={
                                                `dashboard-alert-item ${
                                                    expired
                                                        ? "expired"
                                                        : "expiring"
                                                }`
                                            }
                                            key={
                                                document.id
                                            }
                                        >

                                            <div className="dashboard-alert-info">

                                                <div className="dashboard-alert-icon">

                                                    {
                                                        expired
                                                            ? "!"
                                                            : "📄"
                                                    }

                                                </div>


                                                <div>

                                                    <h3>

                                                        {
                                                            document.title
                                                        }

                                                    </h3>


                                                    <span>

                                                        {
                                                            document.type
                                                        }

                                                    </span>


                                                    <p>

                                                        Expiry:{" "}

                                                        {
                                                            formatDate(
                                                                document.expiryDate
                                                            )
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        document.path
                                                    )
                                                }
                                            >

                                                {
                                                    expired
                                                        ? "Renew Now"
                                                        : "Review"
                                                }

                                            </button>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    SCHENGEN
                ================================================= */}

                <div className="dashboard-panel schengen-panel">

                    <div className="schengen-header">

                        <div className="schengen-title">

                            <div>
                                🇪🇺
                            </div>


                            <div>

                                <h2>
                                    Schengen 90/180-Day Rule
                                </h2>

                                <p>
                                    Rolling window stay calculator
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    "/travel-history"
                                )
                            }
                        >

                            Log Trips

                        </button>

                    </div>


                    <div className="schengen-placeholder">

                        <div className="schengen-days">

                            <span>
                                Days Consumed in Window
                            </span>


                            <strong>

                                {schengenUsed}
                                {" / 90 days "}
                                ({schengenPercentage}%)

                            </strong>

                        </div>


                        <div className="schengen-progress">

                            <div
                                className="schengen-progress-bar"
                                style={{
                                    width:
                                        `${schengenPercentage}%`
                                }}
                            />

                        </div>


                        <div className="schengen-scale">

                            <span>
                                0
                            </span>

                            <span>
                                45
                            </span>

                            <span>
                                90
                            </span>

                        </div>


                        <div className="schengen-status">

                            <span>

                                {
                                    schengenUsed >= 90
                                        ? "!"
                                        : "✓"
                                }

                            </span>


                            <span>

                                {schengenStatus}

                            </span>

                        </div>


                        <button
                            className="schengen-simulate"
                            onClick={() =>
                                navigate(
                                    "/travel-history"
                                )
                            }
                        >

                            Add Travel History

                        </button>

                    </div>

                </div>

            </section>


            {/* =================================================
                DESTINATION CHECKLIST
            ================================================= */}

            <section className="dashboard-destination">

                <div>

                    <h2>
                        🌍 Destination Entry Rules
                    </h2>

                    <p>

                        Check passport, visa, insurance
                        and vaccination requirements
                        before your next trip.

                    </p>

                </div>


                <button
                    onClick={() =>
                        navigate(
                            "/checklist/india"
                        )
                    }
                >

                    Check Requirements →

                </button>

            </section>


            {/* =================================================
                REMINDERS
            ================================================= */}

            <section className="dashboard-panel dashboard-reminder-panel">

                <div className="dashboard-panel-header">

                    <div>

                        <h2>
                            🔔 Upcoming Reminders
                        </h2>

                        <p>

                            Stay on top of important
                            travel deadlines.

                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate(
                                "/reminders"
                            )
                        }
                    >

                        View All →

                    </button>

                </div>


                {pendingReminders.length === 0 ? (

                    <div className="dashboard-empty-small">

                        No pending reminders.

                    </div>

                ) : (

                    <div className="dashboard-reminder-list">

                        {pendingReminders.map(
                            (reminder) => (

                                <div
                                    className="dashboard-reminder-item"
                                    key={
                                        reminder.id
                                    }
                                >

                                    <div>

                                        <h3>
                                            {
                                                reminder.title
                                            }
                                        </h3>


                                        <p>

                                            {
                                                reminder.description ||
                                                "Travel reminder"
                                            }

                                        </p>

                                    </div>


                                    <span>

                                        {
                                            formatDate(
                                                reminder.reminderDate
                                            )
                                        }

                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>

        </div>

    );
}

export default Dashboard;