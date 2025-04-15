
import { Navigate } from 'react-router';
import Topbar from './Topbar';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
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
