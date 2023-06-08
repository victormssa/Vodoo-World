import { useState } from "react";
import axios, { AxiosError } from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api-vodoo-world.vercel.app/auth", {
        username,
        email,
        password,
        fullname,
        cellphone,
      });
      
      // Se a resposta for bem-sucedida, você pode fazer algo com os dados retornados
      console.log(response.data);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {error && (
          <p className="text-red-500 mb-4">
            Error: {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md p-2 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block font-medium">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md p-2 w-full"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cellphone" className="block font-medium">
              Cellphone
            </label>
            <input
              type="text"
              id="cellphone"
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md p-2 w-full"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
