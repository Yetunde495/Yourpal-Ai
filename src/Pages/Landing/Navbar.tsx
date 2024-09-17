import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = ({ className }: any) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <header className={`sticky text-black ${className}`}>
      <nav
        aria-label="Global"
        className="mx-auto lg:flex max-w-[95%] items-center justify-between py-6 px-6 gap-x-12 hidden rounded-b-[64px] nav"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={Logo}
              className="h-[60px] object-contain"
              width={209.67}
              height={60}
            />
          </Link>
        </div>

        <div className="lg:flex justify-between gap-x-10 hidden">
          <Link
            to="/Products"
            className={`${currentPath === "/Products" ? "active" : ""}`}
          >
            Products
          </Link>
          <Link
            to="/Pricing"
            className={`${currentPath === "/Pricing" ? "active" : ""}`}
          >
            Pricing
          </Link>
          <Link
            to="/how-it-works"
            className={`${currentPath === "/how-it-works" ? "active" : ""}`}
          >
            How it works
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-5 items-center">
          <Link
            rel="noopener noreferrer"
            to="/register"
            className="text-sm font-semibold text-indigo-600 rounded-full hover:border-none border hover:bg-indigo-500  hover:text-white border-indigo-600 px-3.5 py-2 w-[150px] text-center bg-white"
          >
            Sign In
          </Link>
          <Link
            rel="noopener noreferrer"
            to={"/signin"}
            className="rounded-full bg-indigo-600 px-3.5 w-[150px] text-center py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="lg:hidden">{/* <MobileNav /> */}</div>
    </header>
  );
};

export default Navbar;
