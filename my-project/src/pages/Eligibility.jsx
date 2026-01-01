import { eligibilityMap } from "../utils/eligibilityRules";
import { useNavigate } from "react-router-dom";

export default function Eligibility() {
  const navigate = useNavigate();

  const twelfthGroup = localStorage.getItem("twelfth_group");
  const dreamJob = localStorage.getItem("dream_job");

  const eligibleJobs = eligibilityMap[twelfthGroup] || [];
  const isEligible = eligibleJobs.includes(dreamJob);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Eligibility Check Result</h2>

        <div style={styles.meta}>
          <p>
            <b>12th Group:</b>{" "}
            <span style={styles.highlight}>{twelfthGroup}</span>
          </p>
          <p>
            <b>Your Dream Job:</b>{" "}
            <span style={styles.highlight}>{dreamJob}</span>
          </p>
        </div>

        {/* ✅ ELIGIBLE */}
        {isEligible && (
          <div style={{ ...styles.alert, ...styles.success }}>
            ✅ <b>{dreamJob}</b> is eligible for your 12th group.
          </div>
        )}

        {/* ❌ NOT ELIGIBLE */}
        {!isEligible && (
          <>
            <div style={{ ...styles.alert, ...styles.error }}>
              ❌ <b>{dreamJob}</b> is NOT eligible for your 12th group.
            </div>

            <div style={styles.listBox}>
              <h4 style={{ marginBottom: 10 }}>
                Eligible jobs for <b>{twelfthGroup}</b>
              </h4>

              <ul style={styles.list}>
                {eligibleJobs.map((job) => (
                  <li key={job} style={styles.listItem}>
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <button style={styles.backBtn} onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #3b0764, #020024 70%)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    borderRadius: "20px",
    padding: "35px",
    color: "#fff",
    boxShadow: "0 0 40px rgba(168,85,247,0.35)",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#e9d5ff",
    letterSpacing: "1px",
  },

  meta: {
    marginBottom: "20px",
    fontSize: "15px",
    opacity: 0.9,
  },

  highlight: {
    color: "#facc15",
  },

  alert: {
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },

  success: {
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "#052e16",
  },

  error: {
    background: "linear-gradient(135deg,#fecaca,#fee2e2)",
    color: "#7f1d1d",
  },

  listBox: {
    background: "rgba(0,0,0,0.35)",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "25px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
    gap: "10px",
  },

  listItem: {
    padding: "10px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
  },

  backBtn: {
    display: "block",
    margin: "0 auto",
    padding: "12px 26px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "linear-gradient(135deg,#a855f7,#6366f1)",
    color: "#fff",
  },
};
