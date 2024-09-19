import PersonaMgt from "./persona/PersonaMgt";
import Recruitment from "../Recruitment/Recruitment";
import Workspace from "./Workspace";
import AddPersonaForm from "./persona/AddPersonaForm";
import ManageTags from "./persona/manageTags";

function Index() {}

Index.Workspace = Workspace;
Index.Recruitment = Recruitment;
Index.PersonaMgt = PersonaMgt;
Index.AddPersona = AddPersonaForm;
Index.ManageTags = ManageTags;

export default Index;
