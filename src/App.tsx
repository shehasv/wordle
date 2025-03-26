import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <div className='wordle-main-container'>
      <div className='header-container'>
        <img src='images/header.png' onClick={(() => navigate('/'))} />
      </div>
      <div className='body-container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
