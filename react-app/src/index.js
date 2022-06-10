import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { UseModalProvider } from './context/UseModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <UseModalProvider>
      <ModalProvider>
        <Provider store={store}>
            <App />
          </Provider>
      </ModalProvider>
    </UseModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
