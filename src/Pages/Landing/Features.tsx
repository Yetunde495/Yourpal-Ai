import { Header } from "../../components/Header";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="container mx-auto">
      <div className="container mx-auto">
        <Header
          heading="Our Features"
          text="Lorem Ipsum dolor sit amet consectetur"
        />
      </div>
      <FeatureCard />
    </div>
  );
};

export default Features;
