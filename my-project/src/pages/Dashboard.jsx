import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showGo, setShowGo] = useState(false);

  function goHome() {
    navigate("/home"); // 👈 final page
  }

  return (
    <Box
      sx={{
        height: "100vh",
        background: "black",
        position: "relative",
      }}
    >
      {/* VIDEO */}
      <video
        autoPlay
        muted
        onEnded={() => setShowGo(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/school-to-college.mp4" type="video/mp4" />
      </video>

      {/* GO BUTTON */}
      {showGo && (
        <Button
          variant="contained"
          onClick={goHome}
          sx={{
            position: "absolute",
            bottom: 40,
            right: 40,
            fontSize: 18,
            px: 4,
          }}
        >
          GO
        </Button>
      )}
    </Box>
  );
}
