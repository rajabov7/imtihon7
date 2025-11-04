// src/pages/Dashboard.tsx
import { Button, Container, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2} textAlign="center">
        <Typography variant="h4" mb={3}>Profil / Dashboard</Typography>
        <Typography mb={3}>Siz login qildingiz!</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Chiqish
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
