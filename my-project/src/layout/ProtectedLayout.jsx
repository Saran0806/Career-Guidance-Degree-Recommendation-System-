import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

export default function ProtectedLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // 🔥 Active nav style
  const navBtn = {
    color: "#e5e7eb",
    textTransform: "none",
    mx: 1,
    "&.active": {
      color: "#0ef",
      borderBottom: "3px solid #0ef",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#020024" }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Career App
          </Typography>

          <Button
            component={NavLink}
            to="/home"
            sx={navBtn}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/career"
            sx={navBtn}
          >
            Career Recommendation
          </Button>

          <Button
            component={NavLink}
            to="/about"
            sx={navBtn}
          >
            About
          </Button>

          <Button
            color="error"
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}
