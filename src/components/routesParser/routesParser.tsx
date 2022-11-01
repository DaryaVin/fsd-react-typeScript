import React from "react";
import { Route } from "react-router-dom";
import { routesType } from "../../routes";
import { RequireAuth } from "../requireAuth/requireAuth";

export const routesParser = function routesParser( routes: routesType[] ) {
  return routes.map(({ path, Component, isPrivate, childrenRoutes, redirect }, index) => {
      const component = (
        isPrivate && redirect
          ? (
            <RequireAuth redirectPath={redirect} key={index}>
              {Component()}
            </RequireAuth>
          )
          : Component()
      );
      return (
        <Route path={path} element={component} key={index}>
          {childrenRoutes ? routesParser(childrenRoutes) : ""}
        </Route>
      );
    });
}
