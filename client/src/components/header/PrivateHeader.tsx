import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import {BsCalendarPlus} from "react-icons/bs";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import logoWhite from "./../../assets/imgs/logoWhite.jpg";
import logoBlack from "./../../assets/imgs/logoBlack.jpg";
import axios, { AxiosRequestConfig } from 'axios';


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const userId = localStorage.getItem("_Usr_Id_");
  const userIcon = userId;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const logout = () => {
    localStorage.removeItem("_Usr_Tk_");
    localStorage.removeItem("_Usr_Id_");
  };

  const API_URL = "https://api-vodooworld.vercel.app/auth";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("_Usr_Tk_");
  
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      try {
        const response = await axios.get(`${API_URL}/${userId}`, config);
        const { email, fullname } = response.data; // Supondo que os dados de email e nome estão na resposta do servidor
  
        setEmail(email);
        setFullname(fullname);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();
  }, [userId]);
  

  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path
      ? "dark:text-white text-gray-800 border-gray-800 dark:border-white lg:border-b-2 border-b-0 font-semibold"
      : "dark:text-white text-gray-800 font-normal";
  };

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
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  
   
  }, [darkMode]);

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
                    ? "h-[2rem] pr-[1rem] bg-[#151515] lg:mr-10 sm:mr-0 lg:mt-0 mt-2 lg:pr-4  border-2 border-white dark:border-white rounded-full"
                    : " h-[2rem] pr-[1rem] bg-gray-300 lg:mr-10 sm:mr-0 lg:mt-0 mt-2 lg:pr-4  border-2 border-gray-900 dark:border-red-500 rounded-full"
                }`}
              >
                <button
                  className={` h-[1.75rem] bg-gray-100 dark:bg-[#3a3a3a] duration-700 px-2 rounded-3xl ${
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
              <div className="sm:flex lg:hidden relative w-12 h-12 ml-4 ">
                  <span className="absolute -bottom-px right-1 lg:w-4 lg:h-4 w-3 h-3 rounded-full border border-[#d8d8d8] dark:border-white bg-green-500"></span>
                  <img
                    src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userIcon}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full border-0 lg:border-2 border-[#d8d8d8] dark:border-white"
                  />
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
            className={`absolute inset-x-0 z-20 w-full px-6 pt-4 bg-white dark:bg-[#3a3a3a] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="lg:flex-row lg:items-center lg:mx-8 flex flex-col -mx-6 ">
            
              <div className="lg:flex-row lg:items-center lg:flex lg:mt-[3.406rem] lg:mr-44">
                <Link
                  to="/servicos"
                  className={`px-3 py-2 text-gray-800 dark:text-white lg:border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 lg:border-y-0  border-y lg:hover:bg-white hover:bg-[#f5f5f5] lg:dark:hover:bg-[#3a3a3a] hover:dark:bg-[#2a2a2a] dark:hover:text-white lg:dark:border-white dark:border-[#2a2a2a] border-[#f5f5f5] mr-2 flex ${isActive(
                    "/servicos"
                  )}`}
                >
                  <BsCalendarPlus className="mt-1 mr-2 text-lg"></BsCalendarPlus>Agendar Serviço
                </Link>
                <Link
                  to="/produtos"
                  className={`px-3 py-2 text-gray-800 dark:text-white lg:border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 lg:border-b-0 border-b lg:hover:bg-white hover:bg-[#f5f5f5] lg:dark:hover:bg-[#3a3a3a] hover:dark:bg-[#2a2a2a] dark:hover:text-white lg:dark:border-white dark:border-[#2a2a2a] border-[#f5f5f5] mr-2 flex ${isActive(
                    "/produtos"
                  )}`}
                >
                  <AiOutlineShoppingCart className="mt-1 mr-2 text-xl"></AiOutlineShoppingCart>Produtos
                </Link>
                <Link
                  to="/servicos"
                  className={`px-3 py-2 text-gray-800 dark:text-white lg:border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 lg:border-b-0 border-b lg:hover:bg-white hover:bg-[#f5f5f5] lg:dark:hover:bg-[#3a3a3a] hover:dark:bg-[#2a2a2a] dark:hover:text-white lg:dark:border-white dark:border-[#2a2a2a] border-[#f5f5f5] mr-2 flex ${isActive(
                    "/servicos"
                  )}`}
                >
                  <BiUserCircle className="mt-1 mr-2 text-xl"></BiUserCircle>Meu Perfil
                </Link>
              </div>
              
              <div
                className={`${
                  darkMode
                    ? "hidden lg:block ml-6 w-[4.8rem] bg-[#151515] lg:mr-6 sm:mr-0 lg:pr-4  border-2 border-white dark:border-white rounded-full"
                    : "hidden lg:block ml-6 w-[4.8rem] bg-gray-300 lg:mr-6 sm:mr-0 lg:pr-4  border-2 border-gray-900 dark:border-gray-500 rounded-full"
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
              <div className=" lg:flex hidden relative  w-14 h-14 lg:w-16 sm:h-16 ">
                  <span className="absolute -bottom-px right-1 lg:w-4 lg:h-4 w-3 h-3 rounded-full border border-[#d8d8d8] dark:border-white bg-green-500"></span>
                  <img
                    src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userIcon}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full border lg:border-0 border-[#d8d8d8] dark:border-white"
                  />
            </div>
            <div className="lg:flex hidden flex-col ml-2 mr-8">
              <p className="text-black dark:text-white font-semibold">{`${fullname}`}</p>
              <p className="text-black dark:text-white">{`${email}`}</p>
            </div>
              <Link
                to="/"
                onClick={logout}
                className={`px-3 py-2 lg:hover:bg-gray-900  sm:hover:bg-none lg:dark:hover:text-black lg:hover:text-white lg:hover:dark:text-gray-900 border-gray-900 dark:border-white lg:dark:hover:bg-white  lg:font-semibold lg:border-2 sm:border-0 rounded-lg ml-0 flex ${isActive2(
                  "/login"
                )}`}
              >
                <FiLogOut className={"mt-1 mr-2"}/> Logout
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
