import React from 'react';
import "./components/baseComponent/baseStyle.scss";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './components/appRouter/appRouter';

function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <AppRouter/>
      </React.StrictMode>
    </Provider>
  );
}
export default App;
