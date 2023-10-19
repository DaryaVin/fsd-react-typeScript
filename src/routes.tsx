import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Cart } from "./components/cart/cart";
import { Layout, layoutLoader } from "./components/layout/layout";
import { Login } from "./components/login/login";
import { MainBackgroundAnimation } from "./components/mainBackgroundAnimation/mainBackgroundAnimation";
import { Profile } from "./components/profile/profile";
import { Registration } from "./components/registration/registration";
import { RequireAuth, RequireUnauth } from "./components/requireAuth/requireAuth";
import { roomLoader } from "./components/roomPage/roomPage";
import { RoutingErrorPage } from "./components/routingErrorPage/routingErrorPage";
import { searchRoomLoader, SearchRooms } from "./components/searchRooms/searchRooms";
import { VerificationEmail } from "./components/verificationEmail/verificationEmail";
import { RoomPage } from "./components/roomPage/roomPage";
import { OrdersPage, ordersPageLoader } from "./components/ordersPage/ordersPage";
import { MainPage } from "./components/mainPage/mainPage";
import { ContactsPage } from "./components/contactsPage/contactsPage";
import { ProfilePage } from "./components/profilePage/profilePage";

export interface routesType {
  path: string,
  Component: React.ElementType,
  requireAuth?: "auth" | "unauth",
  redirect?: string,
  childrenRoutes?: routesType[],
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    loader: layoutLoader,
    errorElement: <RoutingErrorPage/>,
    children: [
      {
        path: "/",
        element: <MainPage/>,
      },
      {
        path: "login",
        element: <RequireUnauth redirectPath="/profile"><Login/></RequireUnauth>,
      },
      {
        path: "registration",
        element: <RequireUnauth redirectPath="/profile"><Registration/></RequireUnauth>,
      },
      {
        path: "about-us",
        element: <ContactsPage/>,
        children: [
          {
            path: ":block",
            element: <ContactsPage/>,
          }
        ]
      },
      {
        path: "search-rooms",
        element: <SearchRooms/>,
        loader: searchRoomLoader,
      },
      {
        path: "orders",
        element: <RequireAuth redirectPath="/login"><OrdersPage/></RequireAuth>,
        // loader: ordersPageLoader,
      },
      {
        path: "roomPage/:id",
        element: <RoomPage/>,
        loader: roomLoader,
      },
      {
        path: "profile",
        element:  <RequireAuth redirectPath="/login"><ProfilePage/></RequireAuth>,
      },
      {
        path: "cart",
        element:  <RequireAuth redirectPath="/login"><Cart/></RequireAuth>,
      },
    ]
  },
])
