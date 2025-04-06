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
        name: ''
    })

    useEffect(() => {
        socket.on('invalidRoom',((data) => {
            console.log(data)
        }))
        socket.on('roomFull',(() => {
            console.log('Room is full')
        }))
        socket.on('validRoom',((data) => {
            console.log(data)
            setOpenDialog(false);
            navigate('/play',{
                state: {
                    solution: data.solution
                }
            })
        }))
    },[roomStatus])


    const createRoom = () => {
        const roomId = generateRoomId();
        socket.emit('createRoom',{
            name: playerName,
            roomName: roomId,
            solution: getSolution()
        })
        setRoomStatus({
            created:true,
            name: roomId
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
            name: ''
        })
        setOpenDialog(false);
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
        <DialogTitle id="alert-dialog-title">
          {"Play with friends"}
        </DialogTitle>
        <DialogContent>
            <div className='dialog-content-container'>
                <div className='name-container'>
                    <TextField autoFocus size="small" label="Player Name" variant="outlined" value={playerName} onChange={(e) => handlePlayerNameValueChange(e.target.value)} />
                </div>
                <div className='room-container d-flex gap-1'>
                    <div className='room-create-container'>
                        <Button variant="contained" disabled={!playerName || roomStatus.created} size="medium" onClick={() => createRoom()}>Create Room</Button>
                        { roomStatus.created && <div>Invite your friend to join the room: <code>{roomStatus.name}</code></div> }
                    </div>
                    <div><hr /></div>
                    <div className='room-join-container'>
                        <TextField size="small" label="Room Id" variant="outlined" value={joinRoomId} onChange={(e) => handleRoomIdValueChange(e.target.value)} />
                        <Button variant="contained" size="medium" disabled={!joinRoomId || !playerName || roomStatus.created} onClick={() => joinRoom(joinRoomId)}>Join Room</Button>
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

