import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

/* ================= DISTRICTS ================= */

const districts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri",
  "Dindigul","Erode","Kallakurichi","Kanchipuram","Kanyakumari","Karur",
  "Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris",
  "Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivagangai",
  "Tenkasi","Thanjavur","Theni","Thoothukudi","Trichy","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur",
  "Vellore","Viluppuram","Virudhunagar"
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    career: "",
    degree: "",
    district: "",
    colleges: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_b0lkgks",
        "template_3xacrq6",
        {
          career: form.career,
          degree: form.degree,
          district: form.district,
          colleges: form.colleges,
          message: form.message,
        },
        "8_mGzExEnnEBQ9D0V"
      )
      .then(() => {
        alert("Mail sent successfully");
        setForm({
          career: "",
          degree: "",
          district: "",
          colleges: "",
          message: "",
        });
      })
      .catch(() => {
        alert("Mail failed. Check EmailJS config.");
      });
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.card}>
        <form onSubmit={sendEmail} style={styles.form}>
          <input
            name="career"
            placeholder="Career"
            value={form.career}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* DISTRICT DROPDOWN */}
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <textarea
            name="colleges"
            placeholder="Colleges"
            value={form.colleges}
            onChange={handleChange}
            required
            style={{ ...styles.input, height: "90px" }}
          />

          <textarea
            name="message"
            placeholder="Extra details (optional)"
            value={form.message}
            onChange={handleChange}
            style={{ ...styles.input, height: "80px" }}
          />

          <button type="submit" style={styles.sendBtn}>
            Send Details
          </button>
        </form>

        {/* BACK BUTTON – CENTER, BELOW FORM */}
        <div style={styles.backWrap}>
          <button style={styles.backBtn} onClick={() => navigate("/home")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    color: "aqua",
    fontSize: "1.9rem",
    letterSpacing: "1px",
    marginBottom: "30px",
  },

  card: {
    width: "100%",
    maxWidth: "540px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 0 40px rgba(0,255,255,0.25)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    background: "#0c0c0c",
    border: "1px solid #222",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    outline: "none",
    fontSize: "0.95rem",
  },

  sendBtn: {
    marginTop: "12px",
    padding: "12px",
    background: "aqua",
    color: "#000",
    border: "none",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  backWrap: {
    marginTop: "22px",
    display: "flex",
    justifyContent: "center",
  },

  backBtn: {
    background: "transparent",
    border: "1px solid aqua",
    color: "aqua",
    padding: "8px 22px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};
