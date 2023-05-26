import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './css/App.scss';


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
