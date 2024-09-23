import DefaultLayout from "../../layout/DefaultLayout";
import TalentHub from "./TalentHub";

const Recruitment: React.FC = () => {
  return (
    <DefaultLayout>
      <section>
        <div className="pb-6 px-4 md:px-6">
          <TalentHub />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Recruitment;
