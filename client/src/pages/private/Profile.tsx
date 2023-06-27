import Header from '../../components/header/PrivateHeader';
import HeroHome from '../../components/heroHome/HeroHome';
import Map from '../../components/map/Map'
import Footer from '../../components/footer/Footer'
import usePageTitle from '../../hooks/UsePageTitle';
import CarouselSlider from '../../components/carouselSlider/CarouselSlider';

function Profile() {

  return (
    <>
    {usePageTitle("Vodoo World | Profile")}
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

export default Profile;