import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import usePageTitle from "../../hooks/UsePageTitle";

const Construction = () => {
  return (
    <>
      {usePageTitle("Interditado | Vodoo World")}
      <Header />
      <main className="flex flex-col justify-center items-center pt-[18rem] pb-[18rem] h-full">
        <h1 className="lg:text-6xl text-3xl font-bold mb-4 dark:text-white">👷‍♂️ Página em obra! 🚧 🐈‍⬛</h1>
        <p className="text-xl mb-4 dark:text-white text-center">
          Oops, parece que a página que você está procurando ainda está em construção...
        </p>
        <a
          href="/"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white hover:text-red-100 duration-200 gap-x-2 sm:w-auto  hover:bg-red-700 bg-red-600  font-semibold rounded-lg mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Voltar para Home</span>
        </a>
      </main>
      <Footer />
    </>
  );
};

export default Construction;