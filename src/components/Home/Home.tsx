import './Home.css';
import Button from '@mui/material/Button';
import {  useState } from 'react';
import {Person, People, HelpOutline} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RoomDialog from '../RoomDialog/RoomDialog';
import HowToPlayDialog from '../HowToPlayDialog/HowToPlayDialog';



function Home() {
    const navigate = useNavigate();
    const [isGameStarted,setIsGameStarted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openHowToPlay, setOpenHowToPlay] = useState(false);
    const [gameLevel] = useState('easy')
    

    const startGame = (gameMode:string) => {
        if(gameMode == 'offline'){
            navigate('/play',{
                state: {
                    mode: gameMode,
                    gameLevel: gameLevel
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
            <div style={{ marginTop: '2rem' }}>
                {!isGameStarted && <Button variant="text" startIcon={<HelpOutline />} onClick={() => setOpenHowToPlay(true)}>How To Play</Button>}
            </div>
            <RoomDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
            <HowToPlayDialog openDialog={openHowToPlay} setOpenDialog={setOpenHowToPlay} />
        </div>
    </div>
}

export default Home