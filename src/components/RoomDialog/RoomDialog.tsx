import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import './RoomDialog.css'
import { useState } from 'react';


const RoomDialog = ({openDialog, setOpenDialog}:{openDialog:boolean,setOpenDialog:any}) => {

    const [joinRoomId, setJoinRoomId] = useState('');
    const [playerName, setPlayerName] = useState('Player'+ Math.floor(Math.random() * (100 - 1 + 1) + 1));

    const handleClose = () => {
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
                        <Button variant="contained" disabled={!playerName} size="medium" onClick={() => handleClose()}>Create Room</Button>
                    </div>
                    <div><hr /></div>
                    <div className='room-join-container'>
                        <TextField size="small" label="Room Id" variant="outlined" value={joinRoomId} onChange={(e) => handleRoomIdValueChange(e.target.value)} />
                        <Button variant="contained" size="medium" disabled={!joinRoomId || !playerName} onClick={() => handleClose()}>Join Room</Button>
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