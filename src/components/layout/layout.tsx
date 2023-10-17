import React from 'react';
import "./layout.scss";
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { SetAuthWatcher } from "../../store/actions/authActions";
import { store } from '../../store/store';

export async function layoutLoader() {
  // await CheckAuth()(store.dispatch);
  await SetAuthWatcher()(store.dispatch);
  return null;
}

export const Layout = () => {
  return (
    <div className='layout'>
      <Header></Header>
      <div className='layout__wrap'>
      <div className='layout__wrap1'>
      <Outlet></Outlet>
      </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
