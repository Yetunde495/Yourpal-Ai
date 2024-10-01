import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { useApp } from "../context/AppContext";
import { HOME_NAV_DATA } from "./config";
import logo1 from "../assets/svg/logo-1.svg";
import logo2 from "../assets/nav-icons/jobseeker.svg";
import logo3 from "../assets/nav-icons/recruiter.svg";
import logo4 from "../assets/nav-icons/social.svg";

import { SOCIAL_NAV_DATA } from "./config";
import { JOBSEEKER_NAV_DATA } from "./config";
import { RECRUITER_NAV_DATA } from "./config";
import { RiLogoutCircleLine } from "react-icons/ri";
import Modal from "../components/modal";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: any;
  setSidebarOpen: any;
}) => {
  const { hubCategory, signOut } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, _setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [logoutModal, setLogoutModal] = useState(false);
  const handleSignout = async () => {
    signOut();
    navigate("/");
  };

  //nav configuration
  const navConfig =
    hubCategory === "home"
      ? HOME_NAV_DATA
      : hubCategory === "social"
      ? SOCIAL_NAV_DATA
      : hubCategory === "jobseeker"
      ? JOBSEEKER_NAV_DATA
      : RECRUITER_NAV_DATA;

  // const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(1);

  // const toggleDropdown = (index: number) => {
  //   setOpenMenuIndex(openMenuIndex === index ? null : index);
  // };
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
      } w-[260px] flex-col bg-white overflow-y-hidden text-[#4d4d4d] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      {/* <div className="flex items-center justify-between gap-2 px-6 pt-5.5 pb-3">
       

       

        
      </div> */}
      <div className="flex items-center justify-center w-full gap-2 px-6 pt-7 pb-10">
        <img
          src={
            hubCategory === "home"
              ? logo1
              : hubCategory === "jobseeker"
              ? logo2
              : hubCategory === "recruiter"
              ? logo3
              : logo4
          }
          alt="Logo"
          className={`${
            hubCategory === "home"
              ? "w-[160px] h-6"
              : hubCategory === "social"
              ? "w-[80px] h-2"
              : "w-[125px] h-2"
          }block`}
        />
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
                  return (
                    <li key={nindex}>
                      <NavLink
                        to={nchild?.path}
                        className={`group relative flex items-center gap-2.5 font-medium rounded-sm  ${
                          !sidebarOpen ? "px-4 py-2" : "pl-5 py-3"
                        } font-medium duration-300 rounded-xl ease-in-out  ${
                          pathname.includes(nchild?.path)
                            ? `${
                                hubCategory === "home"
                                  ? "text-primary"
                                  : hubCategory === "jobseeker"
                                  ? "text-jobseeker"
                                  : hubCategory === "social"
                                  ? "text-socialpal"
                                  : "text-recruiter"
                              } ${
                                hubCategory === "home"
                                  ? `bg-primary/15`
                                  : hubCategory === "jobseeker"
                                  ? `bg-jobseeker/15`
                                  : hubCategory === "social"
                                  ? `bg-socialpal/15`
                                  : `bg-recruiter/15`
                              } hover:text-white ${
                                hubCategory === "home"
                                  ? "hover:bg-primary/90"
                                  : hubCategory === "jobseeker"
                                  ? "hover:bg-jobseeker/90"
                                  : hubCategory === "social"
                                  ? "hover:bg-socialpal/90"
                                  : "hover:bg-recruiter/90"
                              } dark:text-white hover:text-white`
                            : `text-[#4d4d4d] ${
                                hubCategory === "home"
                                  ? "hover:bg-primary/15 hover:text-primary"
                                  : hubCategory === "jobseeker"
                                  ? "hover:bg-jobseeker/15 hover:text-jobseeker"
                                  : hubCategory === "social"
                                  ? "hover:bg-socialpal/15 hover:text-socialpal"
                                  : "hover:bg-recruiter/15 hover:text-recruiter"
                              }`
                        }`}
                      >
                        {pathname.includes(nchild.path) ? (
                          <FilledIcon
                            style={{ width: "18px", height: "18px" }}
                          />
                        ) : (
                          <NChildIcon
                            style={{ width: "18px", height: "18px" }}
                          />
                        )}

                        {!sidebarOpen && nchild.name}
                        <p className="block lg:hidden">{nchild.name}</p>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          ))}

          <div className="absolute bottom-8 w-full right-0 pr-2 pl-2.5">
            <div
              className={`border border-primary relative flex cursor-pointer items-center gap-2.5 mb-3 rounded-full py-2 px-4 font-medium dark:text-primary hover:bg-primary bg-transparent text-primary hover:text-white duration-300 ease-in-out
               `}
            >
              <MdOutlineFileDownload /> Download Extension
            </div>
            <NavLink
              to={""}
              onClick={() => setLogoutModal(true)}
              className={`group relative flex items-center gap-2.5  rounded-xl py-2 px-4 font-medium hover:text-red-600 duration-300 ease-in-out`}
            >
              <RiLogoutCircleLine className="w-5 h-5" />
              Logout
            </NavLink>
          </div>
        </nav>

        {/* <nav className={`p-2 ${sidebarOpen ? "px-0" : "px-2"}`}>
          {navConfig.map((navdata: any, index: number) => (
            <Fragment key={navdata.section + "-" + index}>
              <h3 className="mb-4 ml-4 text-sm font-semibold">
                {navdata.section}
              </h3>
              <ul className="gap-4 sm:mb-1 flex flex-col">
                {navdata.children.map((nchild: any, nindex: number) => {
                  const NChildIcon = nchild.icon;
                  const FilledIcon = nchild.fillIcon;

                  return (
                    <li key={nindex}>
                      <div
                        onClick={() => toggleDropdown(nindex)}
                        className={`group relative flex items-center justify-between gap-2.5 font-medium dark:text-primary rounded-sm ${
                          !sidebarOpen ? "px-4 py-2" : "pl-5 py-3"
                        } font-medium hover:text-primary duration-300 rounded-xl ease-in-out dark:hover:bg-meta-4 ${
                          pathname.includes(nchild?.path)
                            ? "text-primary bg-primary/15 hover:text-white hover:bg-primary/90 dark:text-white"
                            : "text-[#4d4d4d] hover:bg-primary/15"
                        } cursor-pointer`}
                      >
                        <div className="flex items-center">
                          {pathname.includes(nchild.path) ? (
                            <FilledIcon
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : (
                            <NChildIcon
                              style={{ width: "18px", height: "18px" }}
                            />
                          )}
                          {!sidebarOpen && nchild.name}
                        </div>

                        {nchild.children && (
                          <span className="ml-auto">
                            {openMenuIndex === nindex ? (
                              <Icons.arrowUp />
                            ) : (
                              <Icons.arrowDown />
                            )}
                          </span>
                        )}
                      </div>

                      {nchild.children && openMenuIndex === nindex && (
                        <ul className="ml-4 mt-2">
                          <button className="flex mb-2 gap-2 hover:bg-[#f3edfa] items-center justify-center border font-bold p-2 text-[#8343CC] border-[#8343CC] rounded-full">
                            <Icons.star /> Apply Changes to all
                          </button>
                          {nchild.children.map(
                            (child: any, childIndex: number) => (
                              <li key={childIndex}>
                                <NavLink
                                  to={child.path}
                                  className={`block p-2 rounded-xl hover:bg-[#f3edfa] hover:text-[#8343CC]  ${
                                    pathname.includes(child.path)
                                      ? "text-[#8343CC] "
                                      : "text-gray-600"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    {child.icon && (
                                      <span className="mr-2">
                                        {<child.icon />}
                                      </span>
                                    )}
                                    {child.name}{" "}
                                  </div>
                                </NavLink>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          ))}

          <div className="absolute bottom-8 w-full right-0 pr-2 pl-2.5">
            <div
              className={`border border-primary relative flex cursor-pointer items-center gap-2.5 mb-3 rounded-full py-2 px-4 font-medium dark:text-primary hover:bg-primary bg-transparent text-primary hover:text-white duration-300 ease-in-out
               `}
            >
              <MdOutlineFileDownload /> Download Extension
            </div>
            <NavLink
              to={""}
              onClick={() => setLogoutModal(true)}
              className={`group relative flex items-center gap-2.5  rounded-xl py-2 px-4 font-medium hover:text-red-600 duration-300 ease-in-out`}
            >
              <RiLogoutCircleLine className="w-5 h-5" />
              Logout
            </NavLink>
          </div>
        </nav> */}
        {/* <!-- Sidebar Menu --> */}
      </div>
      <Modal
        show={logoutModal}
        onHide={() => setLogoutModal(false)}
        size="md:w-[450px] w-[350px]"
      >
        <div className="flex flex-col justify-center">
          <span className="mx-auto inline-block bg-danger/15 rounded-full p-4 text-red-600 mb-3">
            <RiLogoutCircleLine size={24} />
          </span>

          <h1 className="text-lg text-black/90 mb-6 text-center">
            Are you sure you want to logout?
          </h1>

          <div className="-mx-3 flex flex-col gap-y-6 px-6">
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                onClick={() => setLogoutModal(false)}
                className="block w-full rounded-full border border-primary bg-primary p-3 text-center font-medium text-white transition hover:opacity-95"
              >
                No
              </button>
            </div>
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                onClick={() => handleSignout()}
                className="block w-full rounded-full text-meta-1 border border-meta-1 bg-white p-3 text-center font-medium hover:text-white transition hover:bg-meta-1"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
