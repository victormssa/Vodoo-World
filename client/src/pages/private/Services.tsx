import Header from '../../components/header/PrivateHeader';
import Footer from '../../components/footer/Footer'
import usePageTitle from '../../hooks/UsePageTitle';

function Services() {

  return (
    <>
    {usePageTitle("Vodoo World | Serviços")}
      <Header />
      <main className='mt-4 py-20'>
        
      </main>
      <Footer />
    </>
  )
}

export default Services;