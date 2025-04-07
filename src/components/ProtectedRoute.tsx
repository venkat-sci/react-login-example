import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, checkSession, updateLastActivity } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const checkSessionTimeout = () => {
      if (token && !checkSession()) {
        toast.error('Session expired. Please login again.');
      }
    };

    // Check session on mount and route change
    checkSessionTimeout();

    // Update last activity when user interacts with the page
    const handleActivity = () => {
      if (token) {
        updateLastActivity();
      }
    };

    // Set up event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Set up interval to check session
    const interval = setInterval(checkSessionTimeout, 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(interval);
    };
  }, [token, checkSession, updateLastActivity]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};