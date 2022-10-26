import React, { useState } from 'react';
import "./components/baseComponent/baseStyle.scss";
import {BrowserRouter} from "react-router-dom";
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AppRouter } from './components/appRouter/appRouter';

function App() {
  return(
    <BrowserRouter>
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
}
export default App;
