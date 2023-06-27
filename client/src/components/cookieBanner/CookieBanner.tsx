import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [cookieConsent, setCookieConsent] = useState(() => {
    const consent = localStorage.getItem("CC");
    return consent ? consent.split("=")[1] === "true" : "";
  });

  const handleAcceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem("CC", "true");
  };

  const handleDeclineCookies = () => {
    setCookieConsent(false);
    localStorage.setItem("CC", "false");
    // Logic to close the modal
    const modal = document.getElementById("cookie-modal");
    if (modal) {
      modal.style.display = "none";
      enableSiteInteraction();
    }
  };

  const disableSiteInteraction = () => {
    document.body.style.pointerEvents = "none";
  };

  const enableSiteInteraction = () => {
    document.body.style.pointerEvents = "auto";
  };

  useEffect(() => {
    if (cookieConsent !== "") {
      if (cookieConsent === true || cookieConsent === false) {
        enableSiteInteraction();
      } else {
        disableSiteInteraction();
      }
    }
  }, [cookieConsent]);

  if (cookieConsent === true || cookieConsent === false) {
    return null;
  }

  return (
    <>
      <section
        id="cookie-modal"
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="max-w-md shadow-2xl p-4 mx-auto bg-white border-2 border-gray-500 dark:bg-[#101010] dark:border-gray-500 rounded-2xl">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            🍪 Nós usamos Cookies!
          </h2>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Olá, este site utiliza cookies essenciais para garantir seu correto
            funcionamento e para melhorar seu desenvolvimento. Os cookies serão configurados apenas após o consentimento. Se possuir alguma dúvida <a href="#" className="text-black dark:text-white font-semibold hover:underline">Leia as políticas de cookies</a>.
          </p>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Ao fechar esse modal, as configurações padrões serão salvas.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4 shrink-0">
            <button
              className="text-xs border text-gray-800 hover:bg-green-500 dark:border-gray-300 dark:text-white dark:hover:bg-green-500 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none"
              onClick={handleAcceptCookies}
            >
              Aceitar o uso de Cookies
            </button>
            <button
              className="text-xs border text-gray-800 hover:bg-red-500 dark:border-gray-300 dark:text-white dark:hover:bg-red-500 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none"
              onClick={handleDeclineCookies}
            >
              Não Aceitar o uso de Cookies
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookieBanner;