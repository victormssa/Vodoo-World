import Header from '../components/header/Header';
import LoginForm from '../components/loginForm/LoginForm';
import Footer from '../components/footer/Footer';

const Login: React.FC = () => {
  return (
    <>
        <Header/>
        <main className='mt-12 py-20'><LoginForm/></main>
        <Footer/>
    </>
  );
};

export default Login;