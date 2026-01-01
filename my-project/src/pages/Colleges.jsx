import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Colleges() {
  const { degreeId } = useParams();
  const navigate = useNavigate();

  const [district, setDistrict] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!degreeId) {
      navigate("/career");
      return;
    }

    api
      .get("colleges/", {
        params: { degree_id: degreeId },
      })
      .then((res) => {
        console.log("COLLEGES API RESPONSE 👉", res.data);

        // 🔥 THIS IS THE FIX
        setDistrict(res.data.district);
        setColleges(res.data.colleges || []);
      })
      .catch((err) => {
        console.error("College API error:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [degreeId, navigate]);

  if (loading) {
    return (
      <Box sx={{ height: "80vh", display: "grid", placeItems: "center", color: "#fff" }}>
        Loading colleges…
      </Box>
    );
  }

  if (colleges.length === 0) {
    return (
      <Box sx={{ height: "80vh", display: "grid", placeItems: "center", color: "#fff" }}>
        ❌ No colleges found for your district
      </Box>
    );
  }

  return (
    <Box p={4} color="#fff">
      <Typography variant="h4" mb={3} textAlign="center">
        Your District : {district}
      </Typography>

      {colleges.map((c) => (
        <Card
          key={c.id}
          sx={{
            mb: 2,
            background: "#1f2937",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            },
          }}
          onClick={async () => {
            await api.post("select-college/", {
              college_id: c.id,
            });
            navigate("/home");
          }}
        >
          <CardContent>
            <Typography fontWeight="bold">{c.name}</Typography>
            <Typography fontSize={13}>
              {c.type || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* STEP 5 */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/final-career")}
      >
        Go to Your Career
      </Button>
    </Box>
  );
}
