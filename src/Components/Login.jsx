import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../services/supabaseClient";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await signInUser({
        identifier: data.username,
        password: data.password,
      });

      if (result.success) {
        setMsgType("success");
        setMessage(result.message || "Login Successful! ✅");

        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("username", result.username || data.username);
        localStorage.setItem("role", result.role || "user");

        setTimeout(() => {
          if (result.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 800);
      } else {
        setMsgType("error");
        setMessage(result.error || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsgType("error");
      setMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-container">
      <h2 className="form-title">Account Login</h2>

      {message && (
        <p className={`msg ${msgType}`} style={{ maxWidth: 440, width: "100%", textAlign: "center", marginBottom: 16 }}>
          {message}
        </p>
      )}

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Username or Email:
            </label>
            <input
              name="username"
              type="text"
              autoFocus
              placeholder="Enter Username or Email"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Password:
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" id="log-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login to Portal"}
          </button>
        </form>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#64748b" }}>
          <p style={{ marginBottom: 8, textAlign: "center" }}>
            Don't have an account yet? <Link to="/register" style={{ color: "#0d9488", fontWeight: 600 }}>Register here</Link>
          </p>
          <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: 8, fontSize: "0.78rem" }}>
            <span>🔑 <strong>Demo Admin:</strong> admin / admin123</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;