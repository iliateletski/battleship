import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import './css/App.scss';

function App() {

  const{application} = useContext(Context)

  return (
    <div className='app'>
      <BrowserRouter basename='/battleship'>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
