import { BrowserRouter, Route } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './css/App.scss';
import HomePage from './pages/HomePage/HomePage';
import { HOME_ROUTE } from './utils/consts';


function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
