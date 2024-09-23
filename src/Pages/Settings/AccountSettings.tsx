import { useState } from "react";
import Tabs, { Tab } from "../../components/tabs";
import DefaultLayout from "../../layout/DefaultLayout";
import Settings from "./Settings";
import Subscription from "./Subscription";
import Teams from "./Teams";

const AccountSettings: React.FC = () => {
  const [tab, setTab] = useState<string>("Settings");
  return (
    <DefaultLayout>
      <section>
        <div className="shadow-2 px-4.5">
          <Tabs>
            <Tab tab="Settings" activeTab={tab} onChange={setTab}></Tab>
            <Tab tab="Subscription" activeTab={tab} onChange={setTab}></Tab>
            <Tab tab="Teams" activeTab={tab} onChange={setTab}></Tab>
          </Tabs>
        </div>

        <div className="pb-6 px-4 md:px-6">
          {tab === "Settings" ? <Settings /> : null}
          {tab === "Subscription" ? <Subscription /> : null}
          {tab === "Teams" ? <Teams /> : null}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default AccountSettings;
