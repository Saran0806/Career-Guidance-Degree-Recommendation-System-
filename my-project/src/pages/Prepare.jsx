import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Prepare() {
  const { degreeId } = useParams();
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PREPARATION STEPS (STEP-3) ================= */
  useEffect(() => {
    let active = true;

    const loadPreparation = async () => {
      if (!degreeId) {
        navigate("/career", { replace: true });
        return;
      }

      try {
        const res = await api.get("preparation-steps/", {
          params: { degree_id: degreeId },
        });

        if (!active) return;

        setSteps(res.data || []);
      } catch (err) {
        console.error("Preparation load error:", err);

        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPreparation();

    return () => {
      active = false;
    };
  }, [degreeId, navigate]);

  /* ================= LOADING ================= */
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
        Loading preparation plan…
      </Box>
    );
  }

  /* ================= NO DATA ================= */
  if (steps.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "grid",
          placeItems: "center",
          color: "#fff",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography>No preparation steps found</Typography>
          <Button variant="outlined" onClick={() => navigate("/career")}>
            Back to Career
          </Button>
        </Stack>
      </Box>
    );
  }

  /* ================= UI ================= */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020024,#090979,#020024)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 720,
          background: "rgba(31,41,55,0.9)",
          borderRadius: 4,
          boxShadow: "0 0 40px rgba(0,255,255,0.25)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            mb={2}
          >
            How to Prepare
          </Typography>

          <Divider sx={{ mb: 3, background: "#333" }} />

          <Stack spacing={2}>
            {steps.map((s) => (
              <Box
                key={s.step}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    minWidth: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#0ef",
                    color: "#000",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {s.step}
                </Box>

                <Typography sx={{ opacity: 0.9 }}>
                  {s.description}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* ================= ACTIONS ================= */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={4}
          >
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate(`/colleges/${degreeId}`)}
            >
              Go to Colleges
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
