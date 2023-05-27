import Header from '../components/header/Header';
import HeroHome from '../components/heroHome/HeroHome';
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import usePageTitle from '../hooks/UsePageTitle';

function Home() {

  return (
    <>
    {usePageTitle("Vodoo World")}
      <Header />
      <main className='mt-4 py-20'>
        <HeroHome/>
        <Map />
      </main>
      <Footer />
    </>
  )
}

export default Home;
