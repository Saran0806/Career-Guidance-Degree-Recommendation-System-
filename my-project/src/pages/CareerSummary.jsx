import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

/* 🎓 EDUCATION THIRUKKURALS */
const KURALS = [
  {
    text: "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக",
    author: "திருவள்ளுவர்",
  },
  {
    text: "எண்ணென்ப ஏனை எழுத்தென்ப\nஇவ்விரண்டும் கண்ணென்ப வாழும் உயிர்க்கு",
    author: "திருவள்ளுவர்",
  },
  {
    text: "கல்வி கரையில கற்பவர் நாள் சில\nமெல்ல நினைக்கப் படும்",
    author: "திருவள்ளுவர்",
  },
  {
    text: "அறிவு அற்றம் அழிக்கும் கருவி\nகல்வி",
    author: "திருவள்ளுவர்",
  },
];

export default function CareerSummary() {
  const [data, setData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showKural, setShowKural] = useState(false);
  const [kural, setKural] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    api
      .get("career-summary/")
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load career summary"));
  }, []);

  const startVideo = () => {
    setShowVideo(true);
    setShowKural(false);

    const random =
      KURALS[Math.floor(Math.random() * KURALS.length)];
    setKural(random);

    setTimeout(() => {
      const video = videoRef.current;
      if (video?.requestFullscreen) video.requestFullscreen();
    }, 300);
  };

  if (!data) {
    return (
      <Box sx={{ color: "#fff", textAlign: "center", mt: 10 }}>
        Loading...
      </Box>
    );
  }

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
      <Card sx={{ maxWidth: 760, width: "100%", background: "#1f2937" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            🎓 Career Summary
          </Typography>

          <Stack spacing={2}>
            <Typography><b>Name:</b> {data.username}</Typography>
            <Typography><b>District:</b> {data.district}</Typography>
            <Typography><b>Dream Job:</b> {data.dream_job}</Typography>
            <Typography><b>12th Group:</b> {data.twelfth_group}</Typography>

            <Typography mt={2}>
              <b>Selected Degree:</b>{" "}
              {data.selected_degree
                ? data.selected_degree.name
                : "Not selected"}
            </Typography>

            <Typography>
              <b>College:</b>{" "}
              {data.college ? data.college.name : "Not selected"}
            </Typography>
          </Stack>

          {!showVideo && (
            <Box textAlign="center" mt={4}>
              <Button variant="contained" size="large" onClick={startVideo}>
                Go to Your College
              </Button>
            </Box>
          )}

          {showVideo && (
            <Box mt={4}>
              <video
                ref={videoRef}
                width="100%"
                autoPlay
                controls
                onEnded={() => setShowKural(true)}
                style={{ borderRadius: 12 }}
              >
                <source src="/videos/student.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </Box>
          )}

          {showKural && kural && (
            <Box
              mt={4}
              p={3}
              sx={{
                background: "rgba(0,0,0,0.55)",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography color="#facc15" fontWeight="bold">
                கல்வி குறள்
              </Typography>

              <Typography mt={1} fontSize={17} lineHeight={1.8}>
                {kural.text}
              </Typography>

              <Typography mt={1} fontSize={13} sx={{ opacity: 0.7 }}>
                — {kural.author}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
