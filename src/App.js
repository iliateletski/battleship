import { BrowserRoutergi } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {

  return (
    <div className='app'>
      <BrowserRouter basename='/battleship'>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
