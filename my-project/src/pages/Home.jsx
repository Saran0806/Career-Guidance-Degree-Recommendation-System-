import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  TextField,
  MenuItem,
  IconButton,
  Snackbar,
  Drawer,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Brightness4 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

/* ======================================================
   STATIC DATA
====================================================== */

const roadmapSteps = [
  "Profile Setup",
  "Choose your career",
  "Prepared your skills",
  "Choose your College",
  "Career Ready",
];

const districts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri",
  "Dindigul","Erode","Kallakurichi","Kanchipuram","Kanyakumari","Karur",
  "Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris",
  "Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivagangai",
  "Tenkasi","Thanjavur","Theni","Thoothukudi","Trichy","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
  "Vellore","Viluppuram","Virudhunagar",
];

const dreamJobs = [
  "Doctor","Engineer","IAS","Software Developer","Teacher","Business",
  "IPS","Railway","Banking","Army","Police SI","AGRICULTURE","Others",
];

const twelfthGroups = [
  "MATHS BIOLOGY",
  "MATHS COMPUTER SCIENCE",
  "COMMERCE",
  "PURE SCIENCE",
  "ARTS AND SCIENCE",
  "AGRICULTURE",
  "ARTS",
  "EMA",
];

/* ======================================================
   COMPONENT
====================================================== */

export default function Home({ toggleTheme }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  /* ---------------- UI STATE ---------------- */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  /* ---------------- PROFILE STATE ---------------- */
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    age: "",
    dob: "",
    district: "",
    dream_job: "",
    twelfth_group: "",
    photo: localStorage.getItem("profilePhoto") || "",
  });

  /* ---------------- ROADMAP STATE ---------------- */
  const [roadmap, setRoadmap] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  /* ======================================================
     LOAD PROFILE
  ===================================================== */
  useEffect(() => {
    api.get("profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  /* ======================================================
     LOAD ROADMAP
  ===================================================== */
  const loadRoadmap = async () => {
    try {
      const res = await api.get("roadmap/");
      setRoadmap(res.data);
    } catch (e) {}
  };

  useEffect(() => {
    loadRoadmap();
  }, [showProfile]);

  /* ======================================================
     PROFILE COMPLETION %
  ===================================================== */
  const requiredFields = ["district", "dream_job", "twelfth_group"];
  const filledCount = requiredFields.filter((k) => profile[k]).length;
  const profilePercent = Math.round(
    (filledCount / requiredFields.length) * 100
  );

  /* ======================================================
     PHOTO UPLOAD
  ===================================================== */
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePhoto", reader.result);
      setProfile((p) => ({ ...p, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  /* ======================================================
     SAVE PROFILE
  ===================================================== */
  async function handleSave() {
    await api.put("profile/", {
      age: profile.age,
      dob: profile.dob,
      district: profile.district,
      dream_job: profile.dream_job,
      twelfth_group: profile.twelfth_group,
    });

    localStorage.setItem("dream_job", profile.dream_job);
    localStorage.setItem("twelfth_group", profile.twelfth_group);

    setSavedOpen(true);
    loadRoadmap();
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const roadmapActive = [
    roadmap.step1,
    roadmap.step2,
    roadmap.step3,
    roadmap.step4,
    roadmap.step1 &&
      roadmap.step2 &&
      roadmap.step3 &&
      roadmap.step4,
  ];

  /* ======================================================
     SIDEBAR
  ===================================================== */
  const Sidebar = (
    <Box sx={{ width: 280, p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Dashboard
      </Typography>

      {isMobile && (
        <>
          <Button fullWidth onClick={() => setShowProfile(false)}>Home</Button>
          <Button fullWidth onClick={() => navigate("/career")}>
            Career Recommendation
          </Button>
          <Button fullWidth onClick={() => navigate("/about")}>About</Button>
          <Button fullWidth color="error" onClick={logout}>Logout</Button>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setShowProfile((p) => !p);
          setDrawerOpen(false);
        }}
      >
        {showProfile ? "Back to Home" : "My Profile"}
      </Button>

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/eligibility")}
      >
        Eligible Check
      </Button>

      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate("/admin-dashboard")}
      >
        Admin
      </Button>

      <Typography fontWeight="bold" mt={4} mb={2}>
        Career Roadmap
      </Typography>

      {roadmapSteps.map((title, i) => (
        <Card
          key={i}
          sx={{
            mb: 1,
            background: roadmapActive[i]
              ? "linear-gradient(135deg,#22c55e,#16a34a)"
              : "#1f2937",
            opacity: roadmapActive[i] ? 1 : 0.4,
          }}
        >
          <CardContent sx={{ p: 1.5 }}>
            <Typography fontSize={14} fontWeight="bold">
              {i + 1}. {title}
            </Typography>

            {i === 0 && (
              <Box mt={1}>
                <Box sx={{ height: 6, background: "#111" }}>
                  <Box
                    sx={{
                      height: "100%",
                      width: `${profilePercent}%`,
                      background:
                        profilePercent === 100
                          ? "linear-gradient(90deg,#22c55e,#4ade80)"
                          : "linear-gradient(90deg,#38bdf8,#2563eb)",
                    }}
                  />
                </Box>
                <Typography fontSize={12} mt={0.5}>
                  {profilePercent}%
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}

      {roadmapActive[4] && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/final-career")}
        >
          Go to Your Career
        </Button>
      )}
    </Box>
  );

  /* ======================================================
     UI
  ===================================================== */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg,#020024,#090979,#020024)",
        color: "#fff",
      }}
    >
      {/* MOBILE TOP BAR */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            display: "flex",
            alignItems: "center",
            px: 2,
            zIndex: 1300,
            background: "#020024",
          }}
        >
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Box flex={1} />

          <IconButton onClick={toggleTheme} color="inherit">
            <Brightness4 />
          </IconButton>
        </Box>
      )}

      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <Box sx={{ borderRight: "1px solid #333" }}>{Sidebar}</Box>
      )}

      {/* MOBILE DRAWER */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {Sidebar}
      </Drawer>

      {/* CONTENT */}
      <Box
        sx={{
          flex: 1,
          mt: isMobile ? 7 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        {showProfile ? (
          /* ================= PROFILE ================= */
          <Box
            sx={{
              width: "100%",
              maxWidth: 520,
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
              boxShadow: "0 0 40px rgba(0,255,255,0.3)",
            }}
          >
            <Typography variant="h5" mb={3}>
              My Profile
            </Typography>

            <Box display="flex" justifyContent="center" mb={2}>
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  value={profilePercent}
                  size={120}
                />
                <Avatar
                  src={profile.photo}
                  sx={{
                    width: 80,
                    height: 80,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              </Box>
            </Box>

            <Button component="label" fullWidth>
              Upload Photo
              <input hidden type="file" onChange={handleImageUpload} />
            </Button>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" value={profile.username} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" value={profile.email} disabled />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  value={profile.age}
                  onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="DOB"
                  InputLabelProps={{ shrink: true }}
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="District"
                  value={profile.district}
                  onChange={(e) =>
                    setProfile({ ...profile, district: e.target.value })
                  }
                >
                  {districts.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Dream Job"
                  value={profile.dream_job}
                  onChange={(e) =>
                    setProfile({ ...profile, dream_job: e.target.value })
                  }
                >
                  {dreamJobs.map((j) => (
                    <MenuItem key={j} value={j}>{j}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="12th Group"
                  value={profile.twelfth_group}
                  onChange={(e) =>
                    setProfile({ ...profile, twelfth_group: e.target.value })
                  }
                >
                  {twelfthGroups.map((g) => (
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </Box>
        ) : (
          /* ================= HOME ================= */
          <Box textAlign="center" maxWidth={700}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              fontWeight="bold"
            >
              Career Guidance & Degree Recommendation System
            </Typography>

            <Typography mt={2} color="#facc15" fontWeight="bold">
              கற்க கசடறக் கற்பவை கற்றபின் <br />
              நிற்க அதற்குத் தக
            </Typography>

            <Typography mt={3} color="rgba(255,255,255,0.8)">
              Build your future step-by-step with a structured roadmap,
              clear goals, and smart career guidance designed for students.
            </Typography>
          </Box>
        )}
      </Box>

      <Snackbar
        open={savedOpen}
        autoHideDuration={2500}
        onClose={() => setSavedOpen(false)}
        message="✅ Profile saved successfully"
      />
    </Box>
  );
}
