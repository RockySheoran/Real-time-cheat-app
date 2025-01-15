import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { store } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { WindowSizeProvider } from './Components/Hooks/windowSizeContext';

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >

      <PersistGate loading={null} persistor={persistor}>
        <WindowSizeProvider>
          <App />
        </WindowSizeProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

