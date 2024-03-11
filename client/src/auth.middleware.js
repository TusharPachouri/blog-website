import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyJWT = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1]; // Get the accessToken from cookies

        if (!token) {
          throw new ApiError(401, 'Unauthorized access');
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken._id;

        // Fetch user details from backend
        const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        // Redirect user to login page or display error message
        console.error('Error:', error.message);
      }
    };

    verifyJWT();
  }, [location.pathname]);

  return <Route {...rest} render={(props) => <Component {...props} user={user} />} />;
};

export default ProtectedRoute;
