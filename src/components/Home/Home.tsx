import './Home.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {Person, People} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [isGameStarted,setIsGameStarted] = useState(false);

    const startGame = (gameMode:string) => {
        navigate('/play',{
            state: {
                mode: gameMode
            }
        });
    }

    return <div>
        <div className='game-mode-container'>
            { !isGameStarted && <Button variant="outlined" size="large" onClick={() => setIsGameStarted(true)}>Play</Button>} 
            {isGameStarted && 
            <div className='d-flex gap-1'>
                <Button variant="outlined" endIcon={<Person />} size="large" onClick={() => startGame('offline')}>Single Player</Button>
                <Button variant="outlined" endIcon={<People />} size="large" onClick={() => startGame('online')}>Multi Player</Button>
            </div>
            }
        </div>
    </div>
}

export default Home