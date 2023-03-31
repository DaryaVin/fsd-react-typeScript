import React from "react";
import { Navigate } from "react-router-dom";
import { Cart } from "./components/cart/cart";
import { Layout } from "./components/layout/layout";
import { Login } from "./components/login/login";
import { MainBackgroundAnimation } from "./components/mainBackgroundAnimation/mainBackgroundAnimation";
import { Profile } from "./components/profile/profile";
import { Registration } from "./components/registration/registration";
import { SearchRooms } from "./components/searchRooms/searchRooms";
import { VerificationEmail } from "./components/verificationEmail/verificationEmail";

export interface routesType {
  path: string,
  Component: React.ElementType,
  requireAuth?: "auth" | "unauth",
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
        requireAuth: "unauth",
        redirect: "/profile",
      },
      {
        path: "registration",
        Component: Registration,
        requireAuth: "unauth",
        redirect: "/verification-email",
      },
      {
        path: "verification-email",
        Component: VerificationEmail,
        requireAuth: "auth",
        redirect: "/login",
      },
      {
        path: "search-rooms",
        Component: SearchRooms,
      },
      {
        path: "profile",
        Component: Profile,
        requireAuth: "auth",
        redirect: "/login",
      },
      {
        path: "cart",
        Component: Cart,
        requireAuth: "auth",
        redirect: "/login",
      },
      {
        path: "*",
        Component: () => (<Navigate to="/"></Navigate>),
      }
    ]
  },
  {
    path: "vk",
    Component: () => {window.location.href = 'https://www.vk.com/'; return <></>}
  },
  {
    path: "instagram",
    Component: () => {window.location.href = 'https://www.instagram.com/'; return <></>}
  },
]
