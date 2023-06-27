import Header from '../components/header/Header';
import HeroHome from '../components/heroHome/HeroHome';
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import usePageTitle from '../hooks/UsePageTitle';
import CarouselSlider from '../components/carouselSlider/CarouselSlider';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode, {JwtPayload} from "jwt-decode";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("checkError") === "true") {
      window.alert(
        "Você precisa fazer login para acessar essa página.\nCaso Esteja com algum erro, chame o suporte."
      );
      localStorage.removeItem("checkError");
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwt_decode(token) as JwtPayload;
      const currentTime = Date.now() / 1000;

      if (decodedToken && typeof decodedToken.exp !== 'undefined' && decodedToken.exp > currentTime) {
        navigate("/user/estoque");
      }
      
    }
  }, [navigate]);

  return (
    <>
    {usePageTitle("Vodoo World")}
      <Header />
      <main className='mt-4 py-20'>
        <HeroHome/>
        <CarouselSlider />
        <Map />
      </main>
      <Footer />
    </>
  )
}

export default Home;
