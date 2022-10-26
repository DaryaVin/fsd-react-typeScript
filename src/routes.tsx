import React from "react";
import { Navigate } from "react-router-dom";
import { Cart } from "./components/cart/cart";
import { Layout } from "./components/layout/layout";
import { Login } from "./components/login/login";
import { MainBackgroundAnimation } from "./components/mainBackgroundAnimation/mainBackgroundAnimation";
import { Profile } from "./components/profile/profile";
import { Registration } from "./components/registration/registration";
import { SearchRooms } from "./components/searchRooms/searchRooms";

export interface routesType {
  path: string,
  Component: () => JSX.Element,
  isPrivate?: boolean,
  redirect?: string,
  childrenRoutes?: routesType[],
}
export const routes: routesType[] = [
  {
    path: "/",
    Component: Layout,
    childrenRoutes: [
      {
        path: "/",
        Component: MainBackgroundAnimation,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "search-rooms",
        Component: SearchRooms,
      },
      {
        path: "profile",
        Component: Profile,
        isPrivate: true,
        redirect: "/login",
      },
      {
        path: "cart",
        Component: Cart,
        isPrivate: true,
        redirect: "/login",
      },
      {
        path: "*",
        Component: () => (<Navigate to="/"></Navigate>),
      }
    ]
  }
]
