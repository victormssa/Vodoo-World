import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';


interface DecodedToken {
  exp: number;
}

interface Credentials {
  username: string;
  password: string;
}


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("checkError") === "true") {
      window.alert(
        "Você precisa fazer login para acessar essa página.\nCaso Esteja com algum erro, chame o suporte."
      );
      localStorage.removeItem("checkError");
    }
    const token = localStorage.getItem("_Usr_tk_");
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        navigate("/user/home");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("credentials");
    if (savedCredentials) {
      try {
        const parsedCredentials: Credentials = JSON.parse(savedCredentials);
        setUsername(parsedCredentials.username);
        setPassword(parsedCredentials.password);
        setRememberMe(true);
      } catch (error) {
        console.error("Erro ao analisar as credenciais:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      const credentials: Credentials = { username, password };
      localStorage.setItem("credentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("credentials");
    }
  }, [rememberMe, username, password]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Credentials = { username: username, password };

    try {
      const url = `https://api-vodooworld.vercel.app/auth/login`;
      const response = await axios.post(url, newItem);
      const data = response.data;
      
      const hasCC = localStorage.getItem("CC");
      const ccValue = hasCC === "true";

      if (ccValue) {
        Cookies.set("_Usr_tk_", data.token, { secure: true, expires: 1 });
        const token = Cookies.get("_Usr_tk_");
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            navigate("/user/home");
          }
        } else {
          setPassword("");
          setUsername("");
          setErrorMessage(data.message);
        }
      } else {
        localStorage.setItem("_Usr_tk_", data.token);
        const token = localStorage.getItem("_Usr_tk_");
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            navigate("/user/home");
          }
        } else {
          setPassword("");
          setUsername("");
          setErrorMessage(data.message);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const { status } = axiosError.response;

          if (status === 401) {
            setErrorMessage("Usuário ou senha incorretos.");
            setErrorFields(["username", "password"]);
          } else if (status === 0) {
            setErrorMessage("Erro com o CORS.");
          } else {
            setErrorMessage(`Erro de requisição: ${status}.`);
          }
        } else {
          setErrorMessage("Erro de requisição desconhecido, cheque o suporte.");
        }
      } else {
        setErrorMessage("Erro ao fazer login.");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={login}
        className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg dark:bg-[#313131]"
      >
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-24 dark:hidden block" alt="" />
          <img className="w-auto h-24 hidden dark:block" alt="" />
        </div>
        <div>
          <h1 className="text-xl font-bold dark:text-gray-200">Bem vindo,</h1>
          <p className="dark:text-gray-200">Para continuar realize o login.</p>
        </div>

        <div className="mt-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Nome de usuário
            </label>
            <input
              type="text"
              className={`input ${errorFields.includes("username") && "error"}`}
              placeholder="Usuário"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Senha
              </label>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>

            <input
              type="password"
              className={`input ${errorFields.includes("password") && "error"}`}
              placeholder="●●●●●●●●"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-black focus:ring-3 focus:ring-primary-300 accent-black cursor-pointer"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
              </div>
              <div className="ml-3 mb-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 hover:text-black dark:hover:text-white  cursor-pointer"
                >
                  Lembre-se de mim
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-3">
            {errorMessage && (
              <div className="text-[#ff3030] font-bold">{errorMessage}</div>
            )}
          </div>

          <div className="mt-0">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex justify-between">
              Entrar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            outras formas de login
          </span>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
            <span className="hidden mx-2 sm:inline">Entre com o Google</span>
          </button>

          <a
            href="#"
            className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
            </svg>
          </a>
        </div>

        <div className="flex items-center justify-center mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Não possui uma conta?{" "}
          </span>
          <a
            href="/signup"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Cadastre-se
          </a>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
