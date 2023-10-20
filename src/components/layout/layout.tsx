import React from 'react';
import "./layout.scss";
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { SetAuthWatcher } from "../../store/actions/authActions";
import { store } from '../../store/store';

export async function layoutLoader() {
  await SetAuthWatcher()(store.dispatch);
  return null;
}

export const Layout = () => {
  return (
    <div key={"layout"} className='layout'>
      <Header key={"header"}></Header>
      <div key={"wrap"} className='layout__wrap'>
        <div key={"wrap1"} className='layout__wrap1'>
          <Outlet key={"outlet"}></Outlet>
        </div>
      </div>
      <Footer key={"footer"}></Footer>
    </div>
  )
}
