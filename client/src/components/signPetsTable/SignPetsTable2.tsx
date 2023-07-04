import { useState } from "react";
import axios from "axios";
import image from "../../assets/imgs/image0.jpg";
import avatar from "../../assets/imgs/avatar.png";

interface ErrorResponse {
  error: string;
}

const SignPetsTable = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
    } else {
      setError("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Pega o primeiro arquivo selecionado pelo usuário
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Armazena a imagem como uma URL de dados (data URL)
      };
      reader.readAsDataURL(file); // Lê o conteúdo do arquivo como uma URL de dados
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://api-vodooworld.vercel.app/auth/signup", {
        username,
        email,
        password,
        fullname,
        cellphone,
        permission: "Customer",
        profileImage: selectedImage,
      });
    } catch (err: unknown) {
      const errorResponse = (err as ErrorResponse).error;
      setError(errorResponse ?? "An error occurred.");
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
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-3xl pb-5 pt-12 mx-0 lg:pr-12 lg:w-3/5"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <div className="w-[10rem] mt-[2rem] h-auto mr-0 pl-0 pt-0 pb-0 lg:block hidden">
              {selectedImage && (
                <img
                  className="object-cover w-[10rem] h-[10rem] rounded-full"
                  src={selectedImage}
                  alt="Imagem"
                />
              )}
              {!selectedImage && (
                <img
                  className="object-cover w-[10rem] h-[10rem] rounded-full"
                  src={avatar}
                  alt="Imagem"
                />
              )}
            </div>
            <div className="mt-28">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  dark:bg-white  dark:border-gray-700 focus:border-[#111111] dark:focus:border-[#111111] focus:ring-[#111111] focus:outline-none focus:ring focus:ring-opacity-40"
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
                onChange={handleImageChange}
              />
            </div>

            <section>
              <div className="flex items-center justify-between mt-0">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-black focus:ring-3 focus:ring-primary-300 accent-black cursor-pointer"
                      required
                    />
                  </div>
                  <div className="ml-3 mb-3 text-sm">
                    <label
                      htmlFor="remember"
                      className=" text-black dark:text-white  cursor-pointer"
                    >
                      Aceito os Termos & Condições.
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-0">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember2"
                      aria-describedby="remember2"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-black focus:ring-3 focus:ring-primary-300 accent-black cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 mb-3 text-sm">
                    <label
                      htmlFor="remember2"
                      className=" text-black dark:text-white  cursor-pointer"
                    >
                      Aceito receber notícias e notificações.
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-center mb-3">
              {error && <div className="text-[#ff3030] font-bold">{error}</div>}
            </div>

            <button
              className="flex items-center justify-between w-full  px-6 py-3 mt-[-1rem] text-sm tracking-wide text-white transition-colors duration-300 transform bg-black rounded-lg hover:bg-[#161616] focus:outline-none focus:ring focus:ring-[#161616] focus:ring-opacity-50 disabled:cursor-not-allowed"
            >
              <span>Cadastre-se </span>

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
      </form>
    </section>
  );
};

export default SignPetsTable;
