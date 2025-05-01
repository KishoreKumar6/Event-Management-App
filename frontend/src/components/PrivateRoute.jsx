// components/PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />; // 🔐 not logged in
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" />; // ⛔ wrong role
  }

  return children;
};

export default PrivateRoute;
