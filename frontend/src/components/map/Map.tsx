function Map() {
  return (
    <>
      <section className="bg-white dark:bg-[#313131]">
        <div className="container px-5 py-4 mx-auto">
          <div className="ml-2"></div>

          <div className="grid grid-cols-1 gap-0 mt-10 lg:grid-cols-3">
            <div className="grid grid-cols-3 gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div className="w-44 hidden lg:block">
                <span className="inline-block p-3 text-yellow-500 rounded-full bg-[#313131] dark:bg-[#313131]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#313131] dark:text-white">
                  Email
                </h2>
                <p className="mt-2 lg:text-sm text-xs text-gray-500 dark:text-gray-400">
                  Nosso Email para contato.
                </p>
                <p className="mt-2 lg:text-sm text-xs text-[#313131] dark:text-yellow-400">
                  vodooworld@gmail.com
                </p>
              </div>

              <div className="w-44 lg:mx-0 mx-3 hidden lg:block">
                <span className="inline-block p-3 text-yellow-500 rounded-full bg-[#313131] dark:bg-[#313131] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#313131] dark:text-white">
                  Loja 01 - Pituba
                </h2>
                <p className="mt-2 lg:text-sm text-xs text-gray-500 dark:text-gray-400">
                  Dentro do Pituba Mall.
                </p>
                <p className="mt-2 lg:text-sm text-xs text-[#313131] dark:text-yellow-400 w-32">
                  R. Alagoas, 92 - Pituba, Salvador - BA, 43700-000
                </p>
              </div>

              <div className="w-44 hidden lg:block">
                <span className="inline-block p-3 text-yellow-500 rounded-full bg-[#313131] dark:bg-[#313131]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#313131] dark:text-white">
                  Telefone
                </h2>
                <p className="mt-2 lg:text-sm text-xs text-gray-500 dark:text-gray-400">
                  Seg-Sex das X às Y.
                </p>
                <p className="mt-2 lg:text-sm text-xs [#313131] dark:text-yellow-400">
                  +55 (71) 99279-4134
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto shadow-lg mt-2">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="mapa"
                marginHeight={0}
                marginWidth={0}
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=pt-BR&amp;q=-13.006986959033693, -38.46141138176997&amp;ie=UTF8&amp;t=&amp;z=18&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Map;
