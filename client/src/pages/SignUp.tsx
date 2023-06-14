import Header from '../components/header/Header';
import SignUpForm from '../components/signUpForm/SignUpForm';
import Footer from '../components/footer/Footer';
import usePageTitle from '../hooks/UsePageTitle';

const SignUp: React.FC = () => {
  return (
    <>
      {usePageTitle("Cadastro | Vodoo World")}
        <Header/>
        <main className=''><SignUpForm /></main>
        <Footer/>
    </>
  );
};

export default SignUp;