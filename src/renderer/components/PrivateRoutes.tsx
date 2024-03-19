import { Navigate } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';
import LayoutPage from '../pages/LayoutPage';

function PrivateRoutes() {
  const authToken = useReadLocalStorage('access_token');
  return authToken ? <LayoutPage /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
