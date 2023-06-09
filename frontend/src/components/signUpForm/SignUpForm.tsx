import { useState } from "react";
import axios from "axios";
import { MdPets } from "react-icons/md";
import image from "../../assets/imgs/image0.jpg";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [error, setError] = useState("");
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api-vodoo-world.vercel.app/auth/signup", {
        username,
        email,
        password,
        fullname,
        cellphone,
        permission: "Customer",
      });

      // Se a resposta for bem-sucedida, você pode fazer algo com os dados retornados
      console.log(response.data);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <section className="bg-white dark:bg-[#313131] pt-24 pr-10 flex flex-row ">
      <div className="w-[60rem] h-auto mr-6 pl-28 pt-20 pb-12 lg:block hidden">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={image}
          alt="Imagem"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center w-full max-w-3xl pb-5 pt-12 mx-0 lg:pr-12 lg:w-3/5">
        <div className="w-full">
          <h1 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-white">
            Faça sua conta gratuita agora.
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            quam laboriosam ut voluptatibus natus, iusto earum maxime pariatur
            quos eligendi at voluptas tempora sequi velit dolor cumque corrupti
            doloremque obcaecati.
          </p>

          <div className="mt-6">
            <h1 className="text-gray-500 dark:text-gray-300">
              Escolha quais perfis você irá criar.
            </h1>

            <div className="mt-3 md:flex md:items-center md:-mx-2">
              <button className="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span className="mx-2">Tutor</span>
              </button>

              <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:dark:text-white rounded-lg md:mt-0 md:w-auto md:mx-2 hover:dark:border-blue-500 dark:border-white dark:text-blue-400 focus:outline-none">
                <MdPets className="h-auto w-6" />
                <span className="mx-2">Pet</span>
              </button>
              <button className="flex justify-center w-full px-2 py-3 mt-4 text-blue-500  dark:text-blue-400 hover:text-white hover:dark:text-white rounded-lg md:mt-0 md:w-auto md:mx-2  focus:outline-none">
                <MdPets className="h-auto w-6" />
                <span className="mx-2 text-xl font-bold">+</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(event) => setFullname(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Nome de usuário
              </label>
              <input
                type="text"
                placeholder="exemplonome"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Número para contato
              </label>
              <input
                type="tel"
                placeholder="(+55) 71 XXXXX-XXXX"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(event) => setCellphone(event.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Senha
              </label>
              <input
                type="password"
                placeholder="●●●●●●●●"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Confirme sua senha
              </label>
              <input
                type="password"
                placeholder="●●●●●●●●"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm text-gray-500 dark:text-gray-300 "
              >
                Foto de Perfil
              </label>

              <input
                type="file"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:cursor-pointer file:border-none file:rounded-full placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>
            
            <div className="flex justify-center mb-3">
            {error && (
                  <div className="text-[#ff3030] font-bold">{error}</div>
                )}
          </div>

            <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" >
              <span>Cadastre-se </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
