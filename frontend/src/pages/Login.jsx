import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
        const loginData = {
            email: formData.email.trim(),
            password: formData.password
        };

        const response = await api.post(
            "/auth/login",
            loginData
        );

        const { token } = response.data;

        login(token);

        navigate("/dashboard");

    } catch (error) {
        console.error("Login error:", error);

        setError(
            error.response?.data?.message ||
            "Login failed"
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p>Smart Visa & Travel Document Tracker</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <p>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;