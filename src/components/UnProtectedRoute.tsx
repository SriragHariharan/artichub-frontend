import { Navigate, Outlet } from 'react-router';

const UnProtectedRoute = () => {
  const token = localStorage.getItem('ahub-token');
  
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default UnProtectedRoute;
