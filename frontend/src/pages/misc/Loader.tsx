import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div>
      {/* Aqui você pode adicionar qualquer conteúdo adicional do seu loader */}
      Carregando...
    </div>
  );
};

export default Loader;
