import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import "./styles/variables.css";
import "./index.css";

import { Navbar, Footer, FloatingReserveBtn, Toast } from "./components";
import {
  Home,
  Menu,
  Reservations,
  Gallery,
  Contact,
  AboutUs,
  Login,
  Signup,
  Dashboard,
} from "./pages";
import { AuthContext, AuthProvider, useAuth } from "./context";
import { TOAST_ANIM_MS } from './components/Toast/Toast';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children, footerVariant = "full" }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer variant={footerVariant} />
    </>
  );
}

function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function GlobalToast() {
  const { activeToast, clearToast, showToast } = useAuth();
  const location = useLocation();
  const [displayToast, setDisplayToast] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const lastHandledToastId = useRef(null);

  // Buffer unmount for exit animation
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

  // Handle cross-page notifications via location state
  useEffect(() => {
    const s = location.state;
    // We only process if there's a toast in state AND we haven't processed THIS location's toast yet
    // React Router location objects are unique for each navigation event (.key)
    if (s && s.toast && lastHandledToastId.current !== location.key) {
      lastHandledToastId.current = location.key;
      
      showToast({
        type: s.toast,
        firstName: s.firstName,
        extra: s.toast === "reservation" ? { date: s.date, time: s.time } : null,
      });
      // Clear the trigger state to prevent loops on re-renders
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalToast />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/menu"
            element={
              <Layout>
                <Menu />
              </Layout>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Reservations />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout footerVariant="light">
                <Gallery />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout footerVariant="light">
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
