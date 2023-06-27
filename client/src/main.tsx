import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from "./routes";
import "./assets/style/global.css";
import CookieBanner from "./components/cookieBanner/CookieBanner";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rotas />
    <CookieBanner />
  </React.StrictMode>
)
