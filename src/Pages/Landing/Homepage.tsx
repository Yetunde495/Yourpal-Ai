import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

import Features from "./Features";

const Homepage: React.FC = () => {
  return (
    <div>
      <div className="hero-bg">
        <Navbar />
        <HeroSection />
      </div>

      <Features />
    </div>
  );
};

export default Homepage;
