import './Home.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {Person, People} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RoomDialog from '../RoomDialog/RoomDialog';
// import io from 'socket.io-client';

function Home() {
    const navigate = useNavigate();
    const [isGameStarted,setIsGameStarted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    

    const startGame = (gameMode:string) => {
        if(gameMode == 'offline'){
            navigate('/play',{
                state: {
                    mode: gameMode
                }
            });
        } else{
            setOpenDialog(true)
        }
        
    }

    return <div>
        <div className='game-mode-container'>
            { !isGameStarted && <Button variant="outlined" size="large" onClick={() => setIsGameStarted(true)}>Play</Button>} 
            {isGameStarted && 
            <div className='d-flex gap-1'>
                <Button variant="outlined" endIcon={<Person />} size="medium" onClick={() => startGame('offline')}>Single Player</Button>
                <Button variant="outlined" endIcon={<People />} size="medium" onClick={() => startGame('online')}>Multi Player</Button>
            </div>
            }
            <RoomDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
    </div>
}

export default Home