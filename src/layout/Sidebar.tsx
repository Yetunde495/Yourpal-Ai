import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SlSettings } from "react-icons/sl";
import { useApp } from "../context/AppContext";
import { HOME_NAV_DATA } from "./config";
import logo1 from "../assets/svg/logo-1.svg";
import { SOCIAL_NAV_DATA } from "./config";
import { JOBSEEKER_NAV_DATA } from "./config";
import { RECRUITER_NAV_DATA } from "./config";


const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: any;
  setSidebarOpen: any;
}) => {
  const { hubCategory } = useApp();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [mini] = useState(false);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  //nav configuration
  const navConfig = hubCategory === "home" ? HOME_NAV_DATA : hubCategory === "social" ? SOCIAL_NAV_DATA :  hubCategory === "jobseeker" ? JOBSEEKER_NAV_DATA : RECRUITER_NAV_DATA

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { [key: string]: any }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { [key: string]: any }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute h-full left-0 top-0 z-9999 flex border-r border-stroke dark:border-strokedark ${
        sidebarOpen ? "lg:hidden" : "lg:static"
      } w-[250px] flex-col bg-white overflow-y-hidden text-[#4d4d4d] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      {/* <div className="flex items-center justify-between gap-2 px-6 pt-5.5 pb-3">
       

       

        
      </div> */}
      <div className="flex items-center justify-between gap-2 px-6 pt-7 pb-10">
        <img src={logo1} alt="Logo" className="block w-[200px] h-6" />
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="sidebar-scrollbar custom-scrollbar flex flex-col overflow-y-hidden overflow-x-hidden  hover:overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className={`p-2 ${sidebarOpen ? "px-0" : "px-2"}`}>
          {navConfig.map((navdata: any, index: number) => (
            <Fragment key={navdata.section + "-" + index}>
              <h3 className="mb-4 ml-4 text-sm font-semibold">
                {navdata.section}
              </h3>
              <ul className="gap-4 sm:mb-1 flex flex-col ">
                {navdata.children.map((nchild: any, nindex: number) => {
                  const NChildIcon = nchild.icon;
                  const FilledIcon = nchild.fillIcon;
                  return  (
                    <li key={nindex}>
                      <NavLink
                        to={nchild?.path}
                        className={`group relative flex items-center gap-2.5 font-medium  dark:text-primary rounded-sm  ${
                          !sidebarOpen ? "px-4 py-2" : "pl-5 py-3"
                        } font-medium  hover:text-primary duration-300 rounded-xl ease-in-out  dark:hover:bg-meta-4 ${
                          pathname.includes(nchild?.path)
                            ? "text-primary bg-primary/15 hover:text-white hover:bg-primary/90 dark:text-white"
                            : "text-[#4d4d4d] hover:bg-primary/15"
                        }`}
                      >
                       {pathname.includes(nchild.path) ? <FilledIcon style={{ width: "18px", height: "18px" }} /> : <NChildIcon style={{ width: "18px", height: "18px" }} />}

                        {!sidebarOpen && nchild.name}
                        <p className="block lg:hidden">{nchild.name}</p>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          ))}

          <div className="absolute bottom-8 w-full right-0 px-4 hidden">
            <NavLink
              to={"/app/patient/settings"}
              className={`group relative flex items-center gap-2.5 text-lg  rounded-sm py-2 px-2 font-medium hover:text-white dark:text-primary hover:bg-primary dark:hover:bg-primary/20 text-black duration-300 ease-in-out dark:hover-bg-meta-4 ${
                pathname.includes("settings") &&
                " text-white bg-primary hover:text-white hover:bg-primary/90 dark:text-white"
              }`}
            >
              <SlSettings className="w-5 h-5" />
              {sidebarOpen ? null : "Settings"}
            </NavLink>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
