import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Passport from "./pages/Passport";
import Visa from "./pages/Visa";
import Insurance from "./pages/Insurance";
import Vaccination from "./pages/Vaccination";
import TravelHistory from "./pages/TravelHistory";

import Documents from "./pages/documents/Documents";
import Passports from "./pages/documents/Passports";
import Visas from "./pages/documents/Visas";
import InsuranceDocuments from "./pages/documents/Insurance";
import Vaccinations from "./pages/documents/Vaccinations";

import Reminders from "./pages/Reminders";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Checklist from "./pages/Checklist";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Compliance from "./pages/admin/Compliance";
import Analytics from "./pages/admin/Analytics";
import Landing from "./pages/Landing";

function ProtectedLayout() {
    return (
        <>
            <Navbar />

            <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </>
    );
}


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    PROTECTED ROUTES
                ========================= */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<ProtectedLayout />}>

                        {/* Dashboard */}

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />


                        {/* =========================
                            DOCUMENTS
                        ========================= */}

                        <Route
                            path="/documents"
                            element={<Documents />}
                        />

                        <Route
                            path="/documents/passports"
                            element={<Passports />}
                        />

                        <Route
                            path="/documents/visas"
                            element={<Visas />}
                        />

                        <Route
                            path="/documents/insurance"
                            element={<InsuranceDocuments />}
                        />

                        <Route
                            path="/documents/vaccinations"
                            element={<Vaccinations />}
                        />


                        {/* =========================
                            REMINDERS
                        ========================= */}

                        <Route
                            path="/reminders"
                            element={<Reminders />}
                        />


                        {/* =========================
                            TRAVEL HISTORY
                        ========================= */}

                        <Route
                            path="/travel-history"
                            element={<TravelHistory />}
                        />


                        {/* =========================
                            OLD ROUTES
                            Keep temporarily
                        ========================= */}

                        <Route
                            path="/passport"
                            element={<Passport />}
                        />

                        <Route
                            path="/visa"
                            element={<Visa />}
                        />

                        <Route
                            path="/insurance"
                            element={<Insurance />}
                        />

                        <Route
                            path="/vaccination"
                            element={<Vaccination />}
                        />

                        <Route path="/checklist/:country" element={<Checklist />} />

                        {/* =========================
                            ADMIN
                        ========================= */}

                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/users"
                            element={<Users />}
                        />

                        <Route
                            path="/admin/compliance"
                            element={<Compliance />}
                        />

                        <Route
                            path="/admin/analytics"
                            element={<Analytics />}
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );
}


export default App;