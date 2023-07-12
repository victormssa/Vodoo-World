import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from "react-router-dom";

function ProfileCard() {
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [cellphone, setCellphone] = useState();
    const userId = localStorage.getItem("_Usr_Id_");
    const userIcon = userId;
    const navigate = useNavigate();
    
    const API_URL = "https://api-vodooworld.vercel.app/auth";

    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem('_Usr_tk_');
    
        const config: AxiosRequestConfig = {
          headers: { Authorization: `Bearer ${token}` },
        };
    
        try {
          const response = await axios.get(`${API_URL}/${userId}`, config);
          const {  email, fullname, username, cellphone } = response.data; // Supondo que os dados de email e nome estão na resposta do servidor
    
          setEmail(email);
          setFullname(fullname);
          setUsername(username);
          setCellphone(cellphone);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchUser();
    }, [userId, navigate]);
  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-[#313131]">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Configurações do Perfil
        </h2>

        <form>
        
        <div className=" relative  w-20 h-20 lg:w-44 lg:h-44 mt-10 mb-10 flex flex-col justify-center ">
                  <img
                    src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userIcon}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full lg:border-0 border-[#d8d8d8] dark:border-white"
                  />
                  <p className="text-gray-700 dark:text-gray-200 ml-[32%] mt-2 text-lg">Sua Foto</p>
            </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
              <label
                htmlFor="image"
                className="block text-md text-gray-500 dark:text-gray-200 "
              >
              Foto de Perfil
              </label>

              <input
                type="file"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-[#313131] border border-gray-200 dark:border-gray-600 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:cursor-pointer file:border-none file:rounded-full placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Nome de Usuário
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-[#313131] dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="Usuário"
                value={username}
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="fullname"
              >
                Nome Completo
              </label>
              <input
                id="fullname"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-[#313131] dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="Seu Nome Completo"
                value={fullname}
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email
              </label>
              <input
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-[#313131] dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="Seu Email"
                value={email}
              />
            </div>
            
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="cellphone"
              >
                Celular
              </label>
              <input
                id="cellphone"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-[#313131] dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                placeholder="(+55) 71 XXXXX-XXXX"
                value={cellphone}
              />
            </div>
          </div>
          
          

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 mr-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Editar
            </button>
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600">
              Excluir Conta
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ProfileCard;
