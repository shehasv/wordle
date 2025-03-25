import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='wordle-main-container'>
      <div className='header-container'>
        <img src='images/header.png' />
      </div>
      <div className='body-container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
