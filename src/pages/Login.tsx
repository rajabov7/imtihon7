// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Alert, Container, Typography, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Login ma’lumotlari noto‘g‘ri");
      }
    } catch (err) {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" mb={3}>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Kuting..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
