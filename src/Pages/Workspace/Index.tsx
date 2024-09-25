import PersonaMgt from "./persona/PersonaMgt";
import Recruitment from "../Recruitment/Recruitment";
import Workspace from "./Workspace";
import AddPersonaForm from "./persona/AddPersonaForm";
import ManageTags from "./persona/ManageTags";
import AccountSettings from "../Settings/AccountSettings";
import SubPricing from "../Settings/SubPricing";
import ActivityReport from "../Settings/ActivityReport";
import Branding from "../Recruitment/Branding";
import AppBuilder from "../Recruitment/AppBuilder";

function Index() {}

Index.Workspace = Workspace;
Index.Recruitment = Recruitment;
Index.PersonaMgt = PersonaMgt;
Index.AddPersona = AddPersonaForm;
Index.ManageTags = ManageTags;
Index.AccountSettings = AccountSettings;
Index.SubPricing = SubPricing;
Index.ActivityReport = ActivityReport;
Index.ApplicationBuilder = AppBuilder;
Index.Branding = Branding;

export default Index;
