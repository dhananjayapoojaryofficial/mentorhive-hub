import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context & guards
import { AuthProvider } from "./context/AuthContext";
import { SessionsProvider } from "./context/SessionsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sessions from "./pages/Sessions";
// import Skills from "./pages/Skills";
import Mentors from "./pages/Mentors";
import MentorProfile from "./mentors/MentorProfile";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

// Shared / legacy pages
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";

// Role dashboards
import LearnerDashboard from "./pages/learner/LearnerDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminReports from "./pages/admin/AdminReports";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminBookings from "./pages/admin/AdminBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SessionsProvider>
          <AuthProvider>
          <Routes>
            {/* ── Public ─────────────────────────────── */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sessions" element={<Sessions />} />
            {/* <Route path="/skills" element={<Skills />} /> */}
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/:id" element={<MentorProfile />} />

            {/* ── Authenticated (any role) ────────────── */}
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* ── Learner Dashboard ───────────────────── */}
            <Route
              path="/learner/dashboard"
              element={
                <ProtectedRoute allowedRoles={["learner"]}>
                  <LearnerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ── Teacher Dashboard ───────────────────── */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            {/* ── Admin Panel ─────────────────────────── */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><AdminTeachers /></ProtectedRoute>} />
            <Route path="/admin/sessions" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSessions /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPayments /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/skills" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSkills /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBookings /></ProtectedRoute>} />

            {/* ── Catch-all ───────────────────────────── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AuthProvider>
        </SessionsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
