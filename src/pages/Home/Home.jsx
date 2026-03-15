import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import Toast from "../../components/Toast/Toast";
import mockData from "../../../mock-data.json";

// Sections
import Hero from "./sections/Hero/Hero";
import InfoBar from "./sections/InfoBar/InfoBar";
import OurStory from "./sections/OurStory/OurStory";
import SignatureDishes from "./sections/SignatureDishes/SignatureDishes";
import ChefSpecial from "./sections/ChefSpecial/ChefSpecial";
import Testimonials from "./sections/Testimonials/Testimonials";

import "./Home.css";

function Home() {
  const location = useLocation();
  const { pendingToast, clearPendingToast } = useAuth();

  const [toast, setToast] = useState(() => {
    const s = location.state;
    if (s?.toast && s?.firstName)
      return { type: s.toast, firstName: s.firstName };
    return null;
  });

  useEffect(() => {
    // 1. Handle pending toasts from Context (e.g. Logout)
    if (pendingToast) {
      setToast(pendingToast);
      clearPendingToast();
    }

    // 2. Clear location state to prevent toast repeating on refresh
    if (location.state?.toast) {
      window.history.replaceState({}, document.title);
    }
  }, [pendingToast, clearPendingToast, location.state]);

  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <div className="home-page overflow-x-hidden">
      {toast && (
        <Toast
          type={toast.type}
          firstName={toast.firstName}
          onDismiss={dismissToast}
        />
      )}

      <Hero />
      <InfoBar />
      <OurStory />
      <SignatureDishes dishes={mockData.signatureDishes} />
      <ChefSpecial />
      <Testimonials reviews={mockData.testimonials} />
    </div>
  );
}

export default Home;
