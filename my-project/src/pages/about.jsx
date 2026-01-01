import React, { useEffect, useRef } from "react";

export default function About() {
  const devTitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && entry.target.classList.add("show"),
      { threshold: 0.4 }
    );
    if (devTitleRef.current) observer.observe(devTitleRef.current);
    return () => observer.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const { name, email, message } = e.target;

    const subject = encodeURIComponent("Career Guidance Contact");
    const body = encodeURIComponent(
      `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=saransaran5475@gmail.com&subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <div className="about-page">
      <style>{`
/* ================= SCOPE LOCK ================= */
.about-page {
  min-height: 100vh;
  padding: 80px 20px;
  background: linear-gradient(135deg,#1f005c,#5b0060,#870160,#ac255e,#ca485c,#e16b5c,#f39060,#ffb56b);
  color: #fff;
}

/* ================= COMMON ================= */
.about-page h2 { font-size: 36px; margin-bottom: 10px; }
.about-page p { opacity: 0.9; line-height: 1.7; }

.about-container {
  max-width: 1200px;
  margin: auto;
}

/* ================= ABOUT ================= */
.about-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(16px);
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 100px;
}

.about-card img {
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
}

/* ================= ROADMAP ================= */
.roadmap {
  margin-bottom: 100px;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: auto;
}

.timeline::after {
  content:"";
  position:absolute;
  width:4px;
  background:#fff;
  top:0;bottom:0;
  left:50%;
}

.step {
  width:50%;
  padding:20px 30px;
}

.step.left { left:0; position:relative; }
.step.right { left:50%; position:relative; }

.step-box {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 16px;
}

/* ================= DEVELOPERS ================= */
.dev-card h3 {
  font-family: "Poppins", "Inter", system-ui, sans-serif;
  text-transform: uppercase;
}

/* ================= TEXT BASE ================= */
.dev-card {
  color: #000; /* all normal text black */
}

/* role / description text */
.dev-card p {
  color: #111;
  font-size: 0.92rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* ================= NAME STYLE ================= */
.dev-card h3 {
  color: #00e5ff;               /* aqua */
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 10px;
  transition: 0.3s ease;
  text-shadow: 0 0 6px rgba(0, 229, 255, 0.4);
}

/* hover glow for name */
.dev-card:hover h3 {
  color: #00ffff;
  text-shadow:
    0 0 8px rgba(0, 255, 255, 0.7),
    0 0 18px rgba(0, 255, 255, 0.5);
  transform: scale(1.03);
}

/* ================= TITLE ================= */
.developers-title h2 {
  color: #000;
  letter-spacing: 2px;
  font-weight: 700;
}

.developers-title p {
  color: #222;
  opacity: 0.85;
}

/* ================= TITLE ANIMATION ================= */
.developers-title {
  text-align: center;
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(40px);
  transition: 0.6s ease;
}

.developers-title.show {
  opacity: 1;
  transform: none;
}

/* ================= GRID LAYOUT ================= */
.dev-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* ================= CARD ================= */
.dev-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  transition: 0.3s ease;
}

.dev-card:hover {
  transform: translateY(-10px);
}
  /* ================= GLOW EFFECT ================= */
.dev-card {
  position: relative;
  overflow: hidden;
}

/* soft glow layer */
.dev-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top left,
    rgba(255, 255, 255, 0.35),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.dev-card:hover::before {
  opacity: 1;
}

/* card glow + lift */
.dev-card:hover {
  transform: translateY(-12px);
  box-shadow:
    0 0 25px rgba(255, 255, 255, 0.25),
    0 0 60px rgba(120, 80, 255, 0.25);
}

/* image glow */
.dev-card:hover .dev-img {
  box-shadow:
    0 0 18px rgba(255, 255, 255, 0.6),
    0 0 40px rgba(120, 80, 255, 0.5);
}


/* ================= IMAGE ================= */
.dev-img {
  width: 160px;
  height: 220px;              /* portrait shape */
  margin: auto;
  margin-bottom: 20px;        /* space for details */
  border-radius: 14px;        /* square, soft edges */
  overflow: hidden;
  border: 3px solid #fff;
  transition: 0.3s ease;
}

.dev-card:hover .dev-img {
  transform: scale(1.03);
}

.dev-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ================= TEXT DETAILS ================= */
.dev-card h3 {
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 1.1rem;
  font-weight: 600;
}

.dev-card p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.85;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 1024px) {
  .dev-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .dev-grid {
    grid-template-columns: 1fr;
  }

  .dev-img {
    width: 140px;
    height: 200px;
  }
}

/* ================= CONTACT – PREMIUM (ONLY CHANGE) ================= */
.contact-premium {
  max-width: 520px;
  margin: 120px auto 0;
  padding: 48px 42px;
  border-radius: 26px;
  background: linear-gradient(
    145deg,
    rgba(255,255,255,0.22),
    rgba(255,255,255,0.08)
  );
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.45);
}

.contact-head {
  text-align: center;
  margin-bottom: 32px;
}

.contact-head h2 {
  font-size: 30px;
  margin-bottom: 8px;
}

.contact-head p {
  font-size: 14px;
  opacity: 0.85;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.12);
  color: #fff;
  outline: none;
  transition: 0.3s ease;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255,255,255,0.65);
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #fff;
  box-shadow: 0 0 20px rgba(255,255,255,0.45);
}

.contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 18px;
}

.contact-form textarea {
  min-height: 120px;
  resize: none;
  margin-bottom: 26px;
}

.contact-form button {
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(135deg,#ffffff,#f1f1f1);
  color: #000;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(255,255,255,0.5);
}

.contact-note {
  display: block;
  text-align: center;
  margin-top: 18px;
  font-size: 12px;
  opacity: 0.7;
}

/* ================= RESPONSIVE ================= */
@media(max-width:900px){
  .about-card { grid-template-columns:1fr; }
  .dev-grid { grid-template-columns:1fr 1fr; }
  .timeline::after { left:20px; }
  .step { width:100%; left:0; padding-left:60px; }
}
@media(max-width:520px){
  .dev-grid { grid-template-columns:1fr; }
  .contact-row { grid-template-columns:1fr; }
  .about-page h2 { font-size:28px; }
}
      `}</style>

      <div className="about-container">
        {/* ABOUT */}
        <div className="about-card">
          <img src="public/images/register.png" />
          <div>
            <h2>About Our System</h2>
            <p>
              Career Guidance & Degree Recommendation System is an intelligent decision-support platform built to help students navigate one of the most critical phases of their lives — choosing the right degree and career. 
              The system bridges the gap between ambition and direction by offering personalized degree recommendations, career pathways, and step-by-step preparation guidance. 
               Our goal is simple: to provide clarity, confidence, and a structured roadmap that aligns education with long-term career success.
            </p>
          </div>
        </div>

        {/* ROADMAP */}
        <div className="roadmap">
          <h2 style={{ textAlign: "center", marginBottom: 40 }}>
            Career Roadmap
          </h2>
          <div className="timeline">
            {[
              "Self Assessment",
              "Career Exploration",
              "Degree Recommendation",
              "Skill Development",
              "Career Planning",
            ].map((s, i) => (
              <div key={i} className={`step ${i % 2 ? "right" : "left"}`}>
                <div className="step-box">
                  <h3>{s}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

    {/* DEVELOPERS */}
<div className="developers-title" ref={devTitleRef}>
  <h2>Developers</h2>
  <p>People who built it, not pitched it</p>
</div>

<div className="dev-grid">
  {/* TEAM LEAD */}
  <div className="dev-card">
    <div className="dev-img">
      <img src="public/images/my blazer pic.jpg" alt="Saran" />
    </div>
    <h3> SARAN.S(TEAM LEAD)</h3>
    <p>
      Led the end-to-end development of the system with a strong focus on architecture,
      feature planning, and overall execution. Played an active role across frontend,
      backend, and database integration, ensuring a stable, user-focused, and scalable
      application.
    </p>
  </div>

  {/* FRONTEND */}
  <div className="dev-card">
    <div className="dev-img">
      <img src="public/images/prasanna.jpg" alt="Prasanna" />
    </div>
    <h3> PRASANNA R</h3>
    <p>
      Focused on frontend development and UI implementation. Built responsive layouts,
      interactive components, and ensured visual consistency across the application
      for an improved user experience.
    </p>
  </div>

  {/* BACKEND */}
  <div className="dev-card">
    <div className="dev-img">
      <img src="public/images/pattamuthu.jpeg" alt="Pattamuthu" />
    </div>
    <h3> PATTAMUTHU M</h3>
    <p>
      Responsible for backend development and server-side logic. Implemented APIs,
      handled core functionalities, and supported system reliability and performance.
    </p>
  </div>

  {/* DATABASE */}
  <div className="dev-card">
    <div className="dev-img">
      <img src="public/images/ARIFAKTHAR.jpg" alt="ArIF Akthar" />
    </div>
    <h3>  AARIF AKTHAR J</h3>
    <p>
      Managed database design and data organization. Worked on structuring data models,
      maintaining integrity, and supporting seamless backend integration.
    </p>
  </div>
</div>


        {/* CONTACT – PREMIUM */}
        <div className="contact-premium">
          <div className="contact-head">
            <h2>Let’s Talk About Your Career</h2>
            <p>
              Confused? Need direction?
              Drop a message — real guidance only.
            </p>
          </div>

          <form className="contact-form" onSubmit={sendEmail}>
            <div className="contact-row">
              <input name="name" placeholder="Your Name" required />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Tell us where you are stuck in your career..."
              required
            />

            <button type="submit">Send Message →</button>
            <span className="contact-note">
              No spam. No sales. Only clarity.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
