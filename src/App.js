import { set } from 'mobx';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import Modal from './components/Modals/Modal';
import './css/App.scss';
import HomePage from './pages/HomePage/HomePage';
import { HOME_ROUTE } from './utils/consts';


function App() {

  const{application} = useContext(Context)
  

  return (
    <div className='app'>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
