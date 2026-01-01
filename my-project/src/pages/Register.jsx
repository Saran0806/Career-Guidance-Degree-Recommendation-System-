import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Autocomplete,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

/* ================= DATA ================= */

const districts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri",
  "Dindigul","Erode","Kallakurichi","Kanchipuram","Kanniyakumari","Karur",
  "Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris",
  "Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivagangai",
  "Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
  "Vellore","Viluppuram","Virudhunagar",
];

const dreamJobs = [
  "Doctor","Engineer","IAS","IPS","Railway Officer",
  "Software Developer","Teacher","Business","Others",
];

const twelfthGroups = [
  "MATHS BIOLOGY", "MATHS COMPUTER SCIENCE", "COMMERCE", "PURE SCIENCE", "ARTS AND SCIENCE","AGRICULTURE","ARTS","EMA"
];

/* ================= COMPONENT ================= */

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "" });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    district: "",
    dreamJob: "",
    twelfthGroup: "",
  });

  /* ================= HELPERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.username.trim()) return "Username required";
    if (!form.email.trim()) return "Email required";
    if (!form.password) return "Password required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!form.age) return "Age required";
    if (!form.dob) return "DOB required";
    if (!form.district) return "District required";
    if (!form.dreamJob) return "Dream Job required";
    if (!form.twelfthGroup) return "12th Group required";
    return null;
  };

  /* ================= REGISTER ================= */

  const handleRegister = async () => {
    const error = validate();
    if (error) {
      setSnack({ open: true, msg: error });
      return;
    }

    try {
      await api.post("auth/register/", form);
      setSnack({ open: true, msg: "Registration successful" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setSnack({
        open: true,
        msg: err.response?.data?.detail || "Registration failed",
      });
    }
  };

  /* ================= UI ================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#0ef,transparent 40%),radial-gradient(circle at bottom right,#7f5cff,transparent 40%),#0b1120",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 950,
          p: 4,
          borderRadius: 4,
          background: "rgba(4, 89, 106, 1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <Typography variant="h4" color="white" mb={3}>
          Create Your Account
        </Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField label="Username" name="username" value={form.username} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField select label="Age" name="age" value={form.age} onChange={handleChange}>
            {[...Array(40)].map((_, i) => (
              <MenuItem key={i} value={i + 15}>
                {i + 15}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="DOB"
            name="dob"
            value={form.dob}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />

          <TextField
            select
            label="12th Group"
            name="twelfthGroup"
            value={form.twelfthGroup}
            onChange={handleChange}
          >
            {twelfthGroups.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            options={districts}
            value={form.district}
            onChange={(e, v) => setForm({ ...form, district: v || "" })}
            renderInput={(params) => <TextField {...params} label="District" />}
          />

          <Autocomplete
            options={dreamJobs}
            value={form.dreamJob}
            onChange={(e, v) => setForm({ ...form, dreamJob: v || "" })}
            renderInput={(params) => <TextField {...params} label="Dream Job" />}
          />
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" fullWidth onClick={handleRegister}>
            Register
          </Button>
          <Button fullWidth color="error" onClick={() => navigate("/login")}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ open: false, msg: "" })}
        message={snack.msg}
      />
    </Box>
  );
}
