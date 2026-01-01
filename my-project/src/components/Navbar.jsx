import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

/* LINK STYLE */
const navStyle = {
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  "&.active": {
    color: "#0ef",
    borderBottom: "2px solid #0ef",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();

  // ✅ md and below = mobile + tablet → HIDE
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  // 🔥 HARD STOP: don’t even render navbar
  if (isMobileOrTablet) {
    return null;
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ color: "#fff", fontWeight: "bold" }}>
            Career App
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={NavLink} to="/home" sx={navStyle}>
              Home
            </Button>
            <Button component={NavLink} to="/career" sx={navStyle}>
              Career Recommendation
            </Button>
            <Button component={NavLink} to="/about" sx={navStyle}>
              About
            </Button>
          </Box>
        </Box>

        {/* RIGHT */}
        <Button color="error" variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
