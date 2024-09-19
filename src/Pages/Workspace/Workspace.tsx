import { useState } from "react";
import Tabs, { Tab } from "../../components/tabs";
import DefaultLayout from "../../layout/DefaultLayout";
import JobHub from "./JobHub";
import TalentHub from "../Recruitment/TalentHub";

const Workspace: React.FC = () => {
  const [tab, setTab] = useState<string>("Job Hub");
  return (
    <DefaultLayout>
      <section>
        <div className="shadow-2 px-4.5">
          <Tabs>
            <Tab tab="Job Hub" activeTab={tab} onChange={setTab}></Tab>
            <Tab tab="Talent Hub" activeTab={tab} onChange={setTab}></Tab>
          </Tabs>
        </div>

        <div className="pb-6 px-4 md:px-6">
            {tab === "Job Hub" ? <JobHub /> : <TalentHub />}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Workspace;
