import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// ✅ FIXED IMPORT (VERY IMPORTANT)
import {
  degreeImages,
  normalizeDegree,
} from "../utils/degreeImages";

export default function Career() {
  const navigate = useNavigate();

  const [degrees, setDegrees] = useState([]);
  const [dreamJob, setDreamJob] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDegrees = async () => {
      try {
        const profileRes = await api.get("profile/");
        const job = profileRes.data.dream_job;

        if (!job) {
          alert("Complete your profile first");
          navigate("/home");
          return;
        }

        setDreamJob(job);

        const degreeRes = await api.get("degrees/", {
          params: { career: job },
        });

        setDegrees(degreeRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDegrees();
  }, [navigate]);

  // ✅ SAVE DEGREE + NAVIGATE
  const handleDegreeClick = async (degree) => {
    try {
      await api.post("select-degree/", {
        degree_id: degree.id,
      });

      navigate(`/prepare/${degree.id}`);
    } catch {
      alert("Failed to save degree");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "grid",
          placeItems: "center",
          color: "#fff",
        }}
      >
        Loading degrees...
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, color: "#fff" }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        fontWeight="bold"
      >
        {dreamJob} – Available Degrees
      </Typography>

      {degrees.length === 0 ? (
        <Typography textAlign="center">
          No degrees found for this career
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {degrees.map((d) => {
            // ✅ THIS IS THE CORE FIX
            const image =
              degreeImages[normalizeDegree(d.name)] ||
              degreeImages.default;

            return (
              <Grid key={d.id} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    background: "#1f2937",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                    },
                  }}
                  onClick={() => handleDegreeClick(d)}
                >
                  <CardContent>
                    {/* ✅ IMAGE WORKS FOR ALL ENGINEERING + MEDICAL */}
                    <img
                      src={image}
                      alt={d.name}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    />

                    <Typography fontWeight="bold" textAlign="center">
                      {d.name}
                    </Typography>

                    <Typography
                      fontSize={12}
                      textAlign="center"
                      sx={{ opacity: 0.7 }}
                    >
                      Tap to see preparation steps
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
