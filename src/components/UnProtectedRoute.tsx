
import { Navigate } from 'react-router';

const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('ahub-token');
  console.log(token, "token")

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnProtectedRoute;
