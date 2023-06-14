import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import logoWhite from "./../../assets/imgs/logoWhite.jpg";
import logoBlack from "./../../assets/imgs/logoBlack.jpg";
import avatarDefault from "./../../assets/imgs/avatar.png";
import axios from "axios";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const userId = localStorage.getItem("userId");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const checkImageSrc = useCallback(() => {
    if (!imageSrc) {
      setImageSrc(avatarDefault);
    }
  }, [imageSrc]);
  
  const API_URL = "http://localhost:3000/auth";
  
  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      try {
        const response = await axios.get(`${API_URL}/${userId}`, config);
        // Converte o buffer da imagem em um array de bytes
        const imageBuffer = response.data.avatar.data; // obtém o buffer de imagem do response
        const blob = new Blob([new Uint8Array(imageBuffer)], {
          type: "image/png",
        }); // cria um objeto Blob a partir do buffer
        const imageUrl = URL.createObjectURL(blob); // cria um URL para o objeto Blob
        setImageSrc(imageUrl); // define a URL como a fonte da imagem
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchItems();
    checkImageSrc();
  }, [checkImageSrc, userId]);
  


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
    const isDarkMode = document.cookie.includes("darkMode=true");
    return isDarkMode || false;
  });

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.cookie = "darkMode=true; path=/";
    } else {
      document.cookie = "darkMode=false; path=/";
    }
  };

  useEffect(() => {
    if (!document.cookie.includes("darkMode")) {
      document.cookie = "darkMode=true; path=/";
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
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 mr-4 ml-4"
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
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 bg-white dark:bg-[#3a3a3a] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="lg:flex-row lg:items-center lg:mx-8 flex flex-col -mx-6 ">
              <Link
                to="/sobre"
                className={`px-3 py-2 text-gray-800 dark:text-white border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 sm:hover:border-b-0  dark:hover:text-white dark:border-white mr-2 ${isActive(
                  "/sobre"
                )}`}
              >
                Sobre a Vodoo World
              </Link>
              <Link
                to="/servicos"
                className={`px-3 py-2 text-gray-800 dark:text-white border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 sm:hover:border-b-0  dark:hover:text-white dark:border-white mr-2 ${isActive(
                  "/servicos"
                )}`}
              >
                Serviços
              </Link>
              <Link
                to="/produtos"
                className={`px-3 py-2 text-gray-800 dark:text-white border-[#3a3a3a] hover:font-semibold lg:hover:border-b-2 sm:hover:border-b-0  dark:hover:text-white dark:border-white mr-2 ${isActive(
                  "/produtos"
                )}`}
              >
                Produtos
              </Link>
              
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
                className={`px-3 py-2 lg:hover:bg-gray-900  sm:hover:bg-none lg:dark:hover:text-black lg:hover:text-white lg:hover:dark:text-gray-900 border-gray-900 dark:border-white lg:dark:hover:bg-white  lg:font-semibold lg:border-2 sm:border-0 rounded-lg mr-2 ${isActive2(
                  "/login"
                )}`}
              >
                Login
              </Link>
            </div>
            <div className="relative w-14 h-14 lg:w-16 sm:h-16">
                  <span className="absolute -bottom-px right-1 lg:w-4 lg:h-4 w-3 h-3 rounded-full border border-white bg-green-500"></span>
                  <img
                    src={imageSrc}
                    alt="Avatar do Usúario"
                    className="w-full h-full rounded-full border lg:border-2"
                  />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
