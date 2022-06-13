import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { NavModalProvider } from './context/NavModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <NavModalProvider>
      <ModalProvider>
        <Provider store={store}>
            <App />
          </Provider>
      </ModalProvider>
    </NavModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
