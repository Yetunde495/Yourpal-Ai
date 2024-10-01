import Recruitment from "../Recruitment/Recruitment";
import Workspace from "./Workspace";
import AccountSettings from "../Settings/AccountSettings";
import SubPricing from "../Settings/SubPricing";
import ActivityReport from "../Settings/ActivityReport";
import Branding from "../Recruitment/Branding";
import AppBuilder from "../Recruitment/AppBuilder";

function Index() {}

Index.Workspace = Workspace;
Index.Recruitment = Recruitment;

Index.AccountSettings = AccountSettings;
Index.SubPricing = SubPricing;
Index.ActivityReport = ActivityReport;
Index.ApplicationBuilder = AppBuilder;
Index.Branding = Branding;

export default Index;
