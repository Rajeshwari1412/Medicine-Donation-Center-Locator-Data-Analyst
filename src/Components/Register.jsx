import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../services/supabaseClient";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirm_password) {
      setMsgType("error");
      setMessage("Passwords do not match ❌");
      return;
    }

    if (form.password.length < 6) {
      setMsgType("error");
      setMessage("Password must be at least 6 characters long ❌");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await signUpUser({
        email: form.email,
        password: form.password,
        username: form.username,
        mobile: form.mobile,
        address: form.address,
      });

      if (result.success) {
        setMsgType("success");
        setMessage(result.message || "Registration Successful! Redirecting to login... ✅");
        setForm({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          mobile: "",
          address: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMsgType("error");
        setMessage(result.error || "Registration failed ❌");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMsgType("error");
      setMessage("Something went wrong during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-container">
      <h2 className="form-title">Create an Account</h2>

      {message && (
        <p className={`msg ${msgType}`} style={{ maxWidth: 440, width: "100%", textAlign: "center", marginBottom: 16 }}>
          {message}
        </p>
      )}

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Full Name:
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. Rajeshwari"
              required
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. rajikotoju@gmail.com"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password (min 6 chars)"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Mobile Number:
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              inputMode="numeric"
              maxLength="10"
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
              Address / Locality:
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              placeholder="Enter locality / city"
              required
            ></textarea>
          </div>

          <button type="submit" id="btn-sub" disabled={loading}>
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.88rem", color: "#64748b" }}>
          Already have an account? <Link to="/login" style={{ color: "#0d9488", fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;