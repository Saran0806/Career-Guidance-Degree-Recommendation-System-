import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Brightness4,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login({ toggleTheme }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password) {
      setError("Username and password required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("auth/login/", {
        username: username.trim(),
        password,
      });

      // ✅ SAVE TOKENS
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // 🔥 HARD REDIRECT (prevents random logout issue)
      window.location.href = "/home";
    } catch (err) {
      // 🔥 CLEAR OLD TOKEN (important)
      localStorage.clear();

      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={pageStyle}>
      <Box sx={cardStyle}>
        {toggleTheme && (
          <IconButton onClick={toggleTheme} sx={themeBtn}>
            <Brightness4 />
          </IconButton>
        )}

        <Typography variant="h4" sx={titleStyle}>
          Welcome Back
        </Typography>

        <Typography sx={subTitleStyle}>
          Login to continue your dream journey
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          sx={inputStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          disabled={loading}
          sx={loginBtn}
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={registerBtn}
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

/* ---------------- STYLES (UNCHANGED) ---------------- */

const pageStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left,#0ef,transparent 40%),radial-gradient(circle at bottom right,#7f5cff,transparent 40%),#0b1120",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: 380,
  p: 4,
  borderRadius: 4,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  position: "relative",
};

const themeBtn = {
  position: "absolute",
  top: 12,
  right: 12,
  color: "#0ef",
};

const titleStyle = {
  textAlign: "center",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#0ef,#7f5cff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subTitleStyle = {
  textAlign: "center",
  fontSize: 13,
  mb: 3,
  color: "rgba(255,255,255,0.7)",
};

const loginBtn = {
  mt: 3,
  py: 1.2,
  fontWeight: "bold",
  background: "linear-gradient(90deg,#0ef,#7f5cff)",
  color: "#000",
  boxShadow: "0 0 20px rgba(0,255,255,0.6)",
};

const registerBtn = {
  mt: 1,
  color: "#0ef",
  borderColor: "#0ef",
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&:hover fieldset": { borderColor: "#0ef" },
    "&.Mui-focused fieldset": { borderColor: "#7f5cff" },
  },
  "& label": { color: "#ccc" },
};
