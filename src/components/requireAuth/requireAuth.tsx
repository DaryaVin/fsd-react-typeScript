import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: JSX.Element,
  redirectPath: string,
}
export const RequireAuth = ({ children, redirectPath }: RequireAuthProps) => {
  const user = false;
  const location = useLocation();
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: { location } }}></Navigate>
  };
  return children;
}
