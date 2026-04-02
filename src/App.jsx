/** App.jsx - Root Router & Layout Assembler **/
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import "./styles/variables.css";
import "./index.css";

import { Navbar, Footer, FloatingReserveBtn, Toast, AnimatedPage } from "./components";
import { Home, Menu, Reservations, Gallery, Contact, AboutUs, Login, Signup, Dashboard } from "./pages";
import { AuthContext, AuthProvider, useAuth } from "./context";
import { TOAST_ANIM_MS } from './components/Toast/Toast';

/** Auth Guard for protected pages **/
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer />
    </>
  );
}

import "./styles/AuthLayout.css";

function AuthLayout({ children }) {
  return (
    <div className="AuthLayout">
      <Navbar />
      <main className="AuthLayout__main">{children}</main>
    </div>
  );
}

/** Centralized Toast Listener **/
function GlobalToast() {
  const { activeToast, clearToast, showToast } = useAuth();
  const location = useLocation();
  const [displayToast, setDisplayToast] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const lastHandledToastId = useRef(null);

  useEffect(() => {
    if (activeToast) {
      setDisplayToast(activeToast);
      setIsExiting(false);
    } else if (displayToast && !isExiting) {
      setIsExiting(true);
      const timer = setTimeout(() => setDisplayToast(null), TOAST_ANIM_MS);
      return () => clearTimeout(timer);
    }
  }, [activeToast, displayToast, isExiting]);

  useEffect(() => {
    // Sync with router state (redirect toasts)
    const s = location.state;
    
    if (s && s.toast && lastHandledToastId.current !== location.key) {
      lastHandledToastId.current = location.key;
      
      showToast({
        type: s.toast,
        firstName: s.firstName,
        extra: s.toast === "reservation" ? { date: s.date, time: s.time } : null,
      });
      // Clean history to prevent pop-on-refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, showToast]);

  if (!displayToast) return null;

  return (
    <Toast
      type={displayToast.type}
      firstName={displayToast.firstName}
      extra={displayToast.extra}
      onDismiss={clearToast}
      isExiting={isExiting}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Layout><Home /></Layout></AnimatedPage>} />
        <Route path="/menu" element={<AnimatedPage><Layout><Menu /></Layout></AnimatedPage>}/>
        <Route path="/reservations" element={<ProtectedRoute><AnimatedPage><Layout><Reservations /></Layout></AnimatedPage></ProtectedRoute>}/>
        <Route path="/gallery" element={<AnimatedPage><Layout><Gallery /></Layout></AnimatedPage>}/>
        <Route path="/contact" element={<AnimatedPage><Layout><Contact /></Layout></AnimatedPage>}/>
        <Route path="/about" element={<AnimatedPage><Layout><AboutUs /></Layout></AnimatedPage>}/>
        <Route path="/login" element={<AnimatedPage><AuthLayout><Login /></AuthLayout></AnimatedPage>}/>
        <Route path="/signup" element={<AnimatedPage><AuthLayout><Signup /></AuthLayout></AnimatedPage>}/>
        <Route path="/dashboard" element={<ProtectedRoute><AnimatedPage><Layout><Dashboard /></Layout></AnimatedPage></ProtectedRoute>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalToast />
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
