import PersonaMgt from "./persona/PersonaMgt";
import Recruitment from "../Recruitment/Recruitment";
import Workspace from "./Workspace";
import AddPersonaForm from "./persona/AddPersonaForm";
import ManageTags from "./persona/ManageTags";
import AccountSettings from "../Settings/AccountSettings";
import SubPricing from "../Settings/SubPricing";

function Index() {}

Index.Workspace = Workspace;
Index.Recruitment = Recruitment;
Index.PersonaMgt = PersonaMgt;
Index.AddPersona = AddPersonaForm;
Index.ManageTags = ManageTags;
Index.AccountSettings = AccountSettings;
Index.SubPricing = SubPricing;

export default Index;
