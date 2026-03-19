import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from '../../context';;
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
  return (
    <div className="home-page overflow-x-hidden">
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
