import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* PAGES */
import Home from "./pages/Home";
import Career from "./pages/Career";
import Prepare from "./pages/Prepare";
import Colleges from "./pages/Colleges";
import About from "./Pages/About1";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CareerSummary from "./pages/CareerSummary";
import AdminDashboard from "./pages/AdminDashboard";
import Eligibility from "./pages/Eligibility";

/* AUTH */
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedLayout from "./layout/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/prepare/:degreeId" element={<Prepare />} />
          <Route path="/colleges/:degreeId" element={<Colleges />} />
          <Route path="/about" element={<About />} />
          <Route path="/final-career" element={<CareerSummary />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/eligibility" element={<Eligibility />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
