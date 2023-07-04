import Loader from './pages/misc/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Error404 from './pages/error/Error404'
import SignUp from './pages/SignUp'
import PrivateRoute from './pages/private/Private';
import PrivateHome from './pages/private/Home';
import PrivateProfile from './pages/private/Profile';
import PrivatePets from './pages/private/Pets';
import PrivateServices from './pages/private/Services';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Construction from './pages/error/Construction';
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/home" element={<PrivateHome />}/>
        <Route path="/user/servicos" element={<PrivateServices />}/>
        <Route path="/user/pets" element={<PrivatePets />}/>
        <Route path="/user/perfil" element={<PrivateProfile />}/>
      </Route>
    </Routes>
  </Router> 
);

export default Rotas;