import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Video() {
  const navigate = useNavigate();

  function finishVideo() {
    navigate("/home");
  }

  return (
    <div style={{ position: "relative", height: "100vh", background: "black" }}>
      <video
        autoPlay
        onEnded={finishVideo}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/videos/student.mp4" type="video/mp4" />
      </video>

      <Button
        variant="contained"
        onClick={finishVideo}
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        Skip
      </Button>
    </div>
  );
}
