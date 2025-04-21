
import { Navigate, Outlet } from 'react-router';
import Topbar from './Topbar';

const ProtectedRoute = () => {
  const token = localStorage.getItem('ahub-token');
  console.log(token, "token")

  return token ? <><Topbar /><Outlet /></> : <Navigate to="/login" replace />
};

export default ProtectedRoute;
