import Header from '../components/header/Header';
import SignInForm from '../components/signInForm/SignInForm';
import Footer from '../components/footer/Footer';
import usePageTitle from '../hooks/UsePageTitle';

const Login: React.FC = () => {
  return (
    <>
      {usePageTitle("Cadastro | Vodoo World")}
        <Header/>
        <main className='mt-12 mb-12 py-[3.75rem]'><SignInForm/></main>
        <Footer/>
    </>
  );
};

export default Login;