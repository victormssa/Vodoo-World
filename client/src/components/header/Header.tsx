import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import logoWhite from "./../../assets/imgs/logoWhite.jpg";
import logoBlack from "./../../assets/imgs/logoBlack.jpg";
import { FiLogIn } from "react-icons/fi";
import { HiUserPlus } from "react-icons/hi2";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const location = useLocation();

  const isActive2 = (path: string) => {
    return location.pathname === path
      ? "lg:dark:bg-white lg:bg-gray-900 sm:dark:bg-none text-black lg:text-white dark:text-white lg:dark:text-black sm:dark:text-white font-semibold sm:dark:hover:font-white"
      : "dark:text-white sm:text-black font-normal hover:font-semibold sm:dark:hover:font-white";
  };
  
  const [darkMode, setDarkMode] = useState(() => {
    const cookieConsent = localStorage.getItem("CC");
    if (cookieConsent === "true") {
      const isDarkMode = document.cookie.includes("DM=true");
      return isDarkMode || false;
    } else {
      const isDarkMode = localStorage.getItem("DM") === "true";
      return isDarkMode || false;
    }
  });
  
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  
    if (localStorage.getItem("CC") === "true") {
      if (newDarkMode) {
        document.cookie = "DM=true; path=/";
      } else {
        document.cookie = "DM=false; path=/";
      }
    } else {
      if (newDarkMode) {
        localStorage.setItem("DM", "true");
      } else {
        localStorage.setItem("DM", "false");
      }
    }
  };
  
  useEffect(() => {
    if (!localStorage.getItem("CC")) {
      localStorage.setItem("CC", "true");
    }
  }, []);
  
  const token = localStorage.getItem("_Usr_tk_");
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
  
      if (decodedToken.exp > currentTime) {
        navigate("/user/home");
      }
    }
  }, [darkMode, navigate, token]);

  return (
    <nav className="fixed top-0 w-full bg-white shadow dark:bg-[#3a3a3a] z-50">
      <div className="container p-0 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center justify-between">
              <img className="w-24 h-auto dark:hidden" src={logoWhite} alt="Logo da Vodoo World" />
              <img className="w-24 h-auto hidden dark:block" src={logoBlack} alt="Logo da Vodoo World" />
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <div
                className={`${
                  darkMode
                    ? "h-[2rem] pr-[1rem] bg-[#151515] lg:mr-10 sm:mr-0 lg:pr-4  border-2 border-white dark:border-white rounded-full"
                    : " h-[2rem] pr-[1rem] bg-gray-300 lg:mr-10 sm:mr-0 lg:pr-4  border-2 border-gray-900 dark:border-red-500 rounded-full"
                }`}
              >
                <button
                  className={` h-[1.75rem] bg-gray-100 dark:bg-[#3a3a3a] duration-700 px-2  rounded-3xl ${
                    darkMode ? "h-[1.75rem] translate-x-4 bg-gray-600 " : ""
                  }`}
                  onClick={handleDarkModeToggle}
                >
                  {darkMode ? (
                    <FiMoon className="text-white w-4" />
                  ) : (
                    <FiSun className="text-gray-900 w-4 " />
                  )}
                </button>
              </div>
              <button
                onClick={toggleMenu}
                type="button"
                className="text-black dark:text-gray-200 hover:text-black dark:hover:text-white focus:outline-none focus:text-black dark:focus:text-white mr-4 ml-4"
                aria-label="toggle menu"
              >
                <svg
                  className={isOpen ? "hidden" : "w-8 h-8"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  className={isOpen ? "w-8 h-8" : "hidden"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-0 bg-white dark:bg-[#3a3a3a] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="lg:flex-row lg:items-center lg:mx-8 flex flex-col -mx-6 ">
              <div
                className={`${
                  darkMode
                    ? "hidden lg:block ml-10 w-[4.8rem] bg-[#151515] lg:mr-10 sm:mr-0 lg:pr-4  border-2 border-white dark:border-white rounded-full"
                    : "hidden lg:blockhidden lg:block ml-10 w-20 bg-gray-300 lg:mr-10 sm:mr-0 lg:pr-4  border-2 border-gray-900 dark:border-gray-500 rounded-full"
                }`}
              >
                <button
                  className={`bg-gray-100 dark:bg-[#3a3a3a] duration-700 px-2 py-[0.8rem] rounded-3xl ${
                    darkMode ? "translate-x-4 bg-gray-600" : ""
                  }`}
                  onClick={handleDarkModeToggle}
                >
                  {darkMode ? (
                    <FiMoon className="text-white w-10" />
                  ) : (
                    <FiSun className="text-gray-900 w-10" />
                  )}
                </button>
              </div>
              <Link
                to="/login"
                className={`px-3 py-2 lg:hover:bg-gray-900  sm:hover:bg-none lg:dark:hover:text-black lg:hover:text-white lg:hover:dark:text-gray-900 lg:border-gray-900 lg:dark:border-white lg:dark:hover:bg-white  lg:font-semibold lg:border-2 sm:border-0 border-t rounded-none lg:rounded-lg border-[#f5f5f5] dark:border-[#2a2a2a] lg:mr-8 mr-0 flex ${isActive2(
                  "/login"
                )}`}
              >
               <FiLogIn className="mt-1 mr-2"></FiLogIn> Entrar
              </Link>
              <Link
                to="/signup"
                className={`px-3 py-2 lg:hover:bg-gray-900  sm:hover:bg-none lg:dark:hover:text-black lg:hover:text-white lg:hover:dark:text-gray-900 lg:border-gray-900 lg:dark:border-white lg:dark:hover:bg-white  lg:font-semibold lg:border-2 sm:border-0 border-t rounded-none lg:rounded-lg border-[#f5f5f5] dark:border-[#2a2a2a] lg:mr-2 mr-0 flex ${isActive2(
                  "/signup"
                )}`}
              >
              <HiUserPlus className="mt-1 mr-2"></HiUserPlus>  Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
