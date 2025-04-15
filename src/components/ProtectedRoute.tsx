
import { Navigate } from 'react-router';
import Topbar from './Topbar';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('ahub-token');
  console.log(token, "token")

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>
  <Topbar />
    {children}
  </>;
};

export default ProtectedRoute;
