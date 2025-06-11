import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed = false, children, redirectPath = '/unauthorized' }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;

