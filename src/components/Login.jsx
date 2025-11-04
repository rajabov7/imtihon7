// src/components/Login.jsx
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { email, password }
      );

      // Agar login muvaffaqiyatli bo‘lsa
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login muvaffaqiyatli!");
        // Keyingi sahifaga yo‘naltirish
        window.location.href = "/dashboard";
      } else {
        setError("Login muvaffaqiyatsiz, ma’lumotlarni tekshiring");
      }
    } catch (err) {
      setError("Login xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
          {loading ? "Kuting..." : "Login"}
        </button>
      </form>
    </div>
  );
}
