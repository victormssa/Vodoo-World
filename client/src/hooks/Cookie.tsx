import { useEffect } from "react";

function useSecureCookie(name: string, value: string, days: number) {
  useEffect(() => {
    const setSecureCookie = () => {
      const expires = days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString() : "";
      const cookie = `${name}=${value}; expires=${expires}; path=/; secure`;

      document.cookie = cookie;
    };

    if (window.location.protocol === "https:") {
      setSecureCookie();
    }
  }, [name, value, days]);
}

export default useSecureCookie;
