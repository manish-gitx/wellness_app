import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    try {
      const response = await axios.post('https://wellnessapp-production.up.railway.app/auth/valid', { token }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then((data) => {
        if (data) {
          console.log(data);
          setIsAuthenticated(true);
          if (location.pathname === '/login' || location.pathname === '/signup') {
            navigate('/home', { replace: true });
          }
        } else {
          setIsAuthenticated(false);
            navigate('/login', { replace: true });
        }
      });
    } 
    else {
      setIsAuthenticated(false);
    
        navigate('/login', { replace: true });
    }
  }, []);

  return null;
}

export default RefreshHandler;
