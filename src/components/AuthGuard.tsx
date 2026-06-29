import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const AuthGuard: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    if (!isAuthenticated && token) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#221916] flex items-center justify-center">
        {/* Simple elegant loading spinner */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-[#E1017D] border-r-transparent border-b-[#E1017D] border-l-transparent rounded-full animate-spin"></div>
          <span className="text-[#a4a4a4] font-raleway font-medium text-lg">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
