import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routes, routesType } from '../../routes';

interface RequireAuthProps {
  children: JSX.Element,
  user: boolean,
  redirectPath: string,
}
const RequireAuth = ({ children, user, redirectPath }: RequireAuthProps) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: { location } }}></Navigate>
  };
  return children;
}

const routesParser = function routesParser(
  routes: routesType[] | null | undefined,
  user: boolean,
) {
  return routes
    ? routes.map(({ path, Component, isPrivate, childrenRoutes, redirect }) => {
      const component = (
        isPrivate && redirect
          ? (
            <RequireAuth user={user} redirectPath={redirect}>
              {Component()}
            </RequireAuth>
          )
          : Component()
      );

      return (
        <Route path={path} element={component}>
          {routesParser(childrenRoutes, user)}
        </Route>
      );
    })
    : "";
}

export const AppRouter = () => {
  return (
    <Routes>
      {routesParser(routes, false)}
    </Routes>
  )
}
