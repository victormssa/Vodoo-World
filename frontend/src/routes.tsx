import Loader from './pages/misc/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Error404 from './pages/error/Error404'
import SignUp from './pages/SignUp'
//import PrivateRoute from './pages/private/Private';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Construction from './pages/error/Construction';
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </Router>
);

export default Rotas;