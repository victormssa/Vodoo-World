import Header from '../components/header/Header';
import LoginForm from '../components/loginForm/LoginForm';
import Footer from '../components/footer/Footer';
import usePageTitle from '../hooks/UsePageTitle';

const Login: React.FC = () => {
  return (
    <>
      {usePageTitle("Login | Vodoo World")}
        <Header/>
        <main className='mt-12 mb-12 py-[3.75rem]'><LoginForm/></main>
        <Footer/>
    </>
  );
};

export default Login;