import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { socket } from './socket';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    return(() => {
      socket.disconnect();
    })
  },[])

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
