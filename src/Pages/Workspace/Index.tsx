import Recruitment from "../Recruitment/Recruitment";
import Workspace from "./Workspace";
import AccountSettings from "../Settings/AccountSettings";
import SubPricing from "../Settings/SubPricing";
import ActivityReport from "../Settings/ActivityReport";

function Index() {}

Index.Workspace = Workspace;
Index.Recruitment = Recruitment;

Index.AccountSettings = AccountSettings;
Index.SubPricing = SubPricing;
Index.ActivityReport = ActivityReport;

export default Index;
