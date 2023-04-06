import React from 'react';
import "./components/baseComponent/baseStyle.scss";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from './components/appRouter/appRouter';

function App() {
  return (
    <Provider store={store}>
      {/* <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter> */}
      <React.StrictMode>
        <AppRouter/>
      </React.StrictMode>
    </Provider>
  );
}
export default App;
