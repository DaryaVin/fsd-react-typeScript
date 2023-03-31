import React from 'react';
import "./layout.scss";
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

export const Layout = () => {
  return (
    <div className='layout'>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
