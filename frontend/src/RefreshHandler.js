import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/home', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      if (location.pathname === '/home' || location.pathname === '/journal') {
        navigate('/login', { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;