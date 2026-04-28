import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import './RoomDialog.css'
import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { words } from '../../words';
import { useNavigate } from 'react-router-dom';
import { generateRoomId } from '../../helper/generateRoomId';




const RoomDialog = ({openDialog, setOpenDialog}:{openDialog:boolean,setOpenDialog:any}) => {
    const navigate = useNavigate();
    const [joinRoomId, setJoinRoomId] = useState('');
    const [playerName, setPlayerName] = useState('Player'+ Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    const [roomStatus, setRoomStatus] = useState({
        created: false,
        name: '',
        solution: ''
    })
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleConnect = () => {
            if (roomStatus.created && roomStatus.name) {
                // Re-create the room on the server because it might have been deleted when disconnected in the background
                socket.emit('createRoom', {
                    name: playerName,
                    roomName: roomStatus.name,
                    solution: roomStatus.solution
                });
            }
        };
        socket.on('connect', handleConnect);

        socket.on('invalidRoom',((data) => {
            console.log(data)
        }))
        socket.on('roomFull',(() => {
            console.log('Room is full')
        }))
        socket.on('validRoom',((data: any) => {
            console.log('validRoom received', data)
            
            let oppName = 'Opponent';
            if (data.players && Array.isArray(data.players)) {
                // Assuming players is an array of objects like { id, name } or strings
                const opponent = data.players.find((p: any) => 
                    (typeof p === 'object' ? p.name !== playerName : p !== playerName)
                );
                if (opponent) {
                    oppName = typeof opponent === 'object' ? opponent.name : opponent;
                }
            } else if (data.opponentName) {
                oppName = data.opponentName;
            } else if (data.name && data.name !== playerName) {
                oppName = data.name;
            }

            setOpenDialog(false);
            navigate('/play',{
                state: {
                    solution: data.solution,
                    roomId: data.roomName,
                    mode: 'online',
                    gameLevel: 'easy',
                    opponentName: oppName
                }
            })
        }))
        
        return () => {
            socket.off('connect', handleConnect);
            socket.off('invalidRoom');
            socket.off('roomFull');
            socket.off('validRoom');
        }
    },[roomStatus, playerName, navigate])


    const createRoom = () => {
        const roomId = generateRoomId();
        const generatedSolution = getSolution();
        socket.emit('createRoom',{
            name: playerName,
            roomName: roomId,
            solution: generatedSolution
        })
        setRoomStatus({
            created:true,
            name: roomId,
            solution: generatedSolution
        })
    }

    const joinRoom = (roomId:string) => {
        socket.emit('joinRoom',{
            name: playerName,
            roomName: roomId
        })
    }

    const getSolution = () => {
            return words[Math.floor(Math.random() * (words.length - 0 + 1) + 0)]?.toUpperCase()   
    }

    const handleClose = () => {
        setRoomStatus({
            created: false,
            name: '',
            solution: ''
        })
        setOpenDialog(false);
    };

    const handleCopy = () => {
        if (roomStatus.name) {
            navigator.clipboard.writeText(roomStatus.name);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleRoomIdValueChange = (value:string) => {
        setJoinRoomId(value);
    }

    const handlePlayerNameValueChange = (value:string) => {
        setPlayerName(value);
    }

    return <div>
        <Dialog
        open={openDialog}
        onClose={()=>{handleClose()}}
        disableEscapeKeyDown={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">
          {"🎮 Play Multiplayer"}
        </DialogTitle>
        <DialogContent>
            <div className='dialog-content-container'>
                <div className='name-container'>
                    <TextField autoFocus size="small" label="Player Name" variant="outlined" fullWidth value={playerName} onChange={(e) => handlePlayerNameValueChange(e.target.value)} />
                </div>
                
                <div className='room-container'>
                    <div className='room-create-container'>
                        <h4 className="section-title">Host a Game</h4>
                        <Button variant="contained" color="secondary" disabled={!playerName || roomStatus.created} size="medium" onClick={() => createRoom()}>Create Room</Button>
                        
                        { roomStatus.created && <div className="room-code-display">
                            <span>Room Code:</span>
                            <div className="code-box">
                                <code>{roomStatus.name}</code>
                                <Button variant="outlined" size="small" onClick={handleCopy} className="copy-btn">
                                    {copied ? '✅ Copied' : '📋 Copy'}
                                </Button>
                            </div>
                            <small className="invite-text">Share this code with your opponent.</small>
                        </div> }
                    </div>
                    
                    <div className="divider-container">
                        <hr className="vertical-divider" /> 
                        <span className="or-badge">OR</span> 
                        <hr className="vertical-divider" />
                    </div>
                    
                    <div className='room-join-container'>
                        <h4 className="section-title">Join a Game</h4>
                        <TextField size="small" label="Room Code" variant="outlined" fullWidth value={joinRoomId} onChange={(e) => handleRoomIdValueChange(e.target.value)} />
                        <Button variant="contained" color="primary" size="medium" disabled={!joinRoomId || !playerName || roomStatus.created} onClick={() => joinRoom(joinRoomId)}>Join Room</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" size="small" onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
}

export default RoomDialog;

