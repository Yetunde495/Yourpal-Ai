import { useState } from "react";
import Tabs, { Tab } from "../../components/tabs";
import DefaultLayout from "../../layout/DefaultLayout";
import TalentHub from "./TalentHub";

const Recruitment: React.FC = () => {
  const [tab, setTab] = useState<string>("Talent Hub");
  return (
    <DefaultLayout>
      <section>
        <div className="shadow-2 px-4.5">
          <Tabs>
            <Tab tab="Talent Hub" activeTab={tab} onChange={setTab}></Tab>
          </Tabs>
        </div>

        <div className="pb-6 px-4 md:px-6">
          {tab === "Talent Hub" ? <TalentHub /> : null}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Recruitment;
