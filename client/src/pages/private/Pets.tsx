import Header from '../../components/header/PrivateHeader';
import SignPetsTable from '../../components/signPetsTable/SignPetsTable';
import Footer from '../../components/footer/Footer';
import usePageTitle from '../../hooks/UsePageTitle';

const Pets: React.FC = () => {
  return (
    <>
      {usePageTitle("Meus Pets | Vodoo World")}
        <Header/>
        <main className=''><SignPetsTable /></main>
        <Footer/>
    </>
  );
};

export default Pets;