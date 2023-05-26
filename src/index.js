import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import "./css/reset.css";
import './css/index.scss';
import App from './App';
import { Application } from './models/Application';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Context.Provider
    value={{
      application: new Application
    }}
  >
    <App />
  </Context.Provider>
);

