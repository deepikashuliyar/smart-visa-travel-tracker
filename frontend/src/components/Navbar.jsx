import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div
                className="navbar-brand"
                onClick={() => navigate("/dashboard")}
            >
                <span className="navbar-logo">
                    SV
                </span>

                <div className="navbar-brand-text">
                    <strong>Smart Visa</strong>
                    <span>Travel Tracker</span>
                </div>
            </div>


            <div className="navbar-actions">

                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                >
                    <span>Logout</span>
                    <span className="logout-icon">→</span>
                </button>

            </div>

        </nav>
    );
}

export default Navbar;