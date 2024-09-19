// import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { BsList } from "react-icons/bs";
import { useApp } from "../context/AppContext";
import HomeIcon from "../assets/nav-icons/home.svg";
import JobIcon from "../assets/nav-icons/jobseeker.svg";
import RecruiterIcon from "../assets/nav-icons/recruiter.svg";
import SocialIcon from "../assets/nav-icons/social.svg";
import { useNavigate } from "react-router-dom";
import DropdownSupport from "./DropdownSupport";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { hubCategory, changeCategory } = useApp();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center gap-3 py-3 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm  bg-white p-1 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <BsList className="text-primary font-extrabold w-6 h-6" />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          <NavLink to="/app"></NavLink>
        </div>

        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-3">
            <li
              className={`flex flex-col items-center hover:bg-primary/15 ${
                hubCategory === "home" ? "bg-primary/15" : ""
              } rounded-md cursor-pointer px-5 py-1.5`}
              onClick={() => {
                changeCategory("home")
                navigate("/app/workspace");
              }}
            >
              <img src={HomeIcon} className="w-10 h-10" />
              <p className="text-xs font-bold">Home</p>
            </li>
            <li
              className={`flex flex-col items-center hover:bg-[#457032]/15 rounded-md cursor-pointer py-1.5 ${
                hubCategory === "jobseeker" ? "bg-[#457032]/15" : ""
              }`}
              onClick={() => changeCategory("jobseeker")}
            >
              <img src={JobIcon} className="w-[100px]" />
            </li>
            <li
              onClick={() => {
                changeCategory("recruiter");
                navigate("/app/recruiter");
              }}
              className={`flex flex-col items-center hover:bg-[#8343CC]/15 rounded-md cursor-pointer py-1.5 ${
                hubCategory === "recruiter" ? "bg-[#8343cc]/15" : ""
              }`}
            >
              <img src={RecruiterIcon} className="w-[100px]" />
            </li>
            <li
              onClick={() => changeCategory("social")}
              className={`flex flex-col items-center hover:bg-[#0077B5]/15 rounded-md cursor-pointer px-2 py-1.5 ${
                hubCategory === "social" ? "bg-[#0077b5]/15" : ""
              }`}
            >
              <img src={SocialIcon} className="" />
            </li>
          </ul>
        </div>

        <div className="flex ms-auto items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

              {/* <!-- Support --> */}
            <DropdownSupport />
            {/* <!-- Support --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
