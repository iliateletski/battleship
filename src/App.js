import { useContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import './css/App.scss';
import HomePage from './pages/HomePage/HomePage';
import { HOME_ROUTE } from './utils/consts';


function App() {

  const{application} = useContext(Context)

  return (
    <div className='container'>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
