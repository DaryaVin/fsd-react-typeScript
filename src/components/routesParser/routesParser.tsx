import React from "react";
import { Route } from "react-router-dom";
import { routesType } from "../../routes";
import { RequireAuth, RequireUnauth } from "../requireAuth/requireAuth";

export const routesParser = function routesParser(routes: routesType[]) {
  return routes.map(({ path, Component, requireAuth, childrenRoutes, redirect }, index) => {
    const component = (
      requireAuth === "auth" && redirect
        ? (
          <RequireAuth redirectPath={redirect} key={index}>
            <Component/>
          </RequireAuth>
        )
        : requireAuth === "unauth" && redirect
          ? (
            <RequireUnauth redirectPath={redirect} key={index}>
              <Component/>
            </RequireUnauth>
          )
          : <Component/>
    );
    return (
      <Route path={path} element={component} key={index}>
        {childrenRoutes ? routesParser(childrenRoutes) : ""}
      </Route>
    );
  });
}
