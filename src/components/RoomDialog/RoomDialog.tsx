import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './RoomDialog.css'


const RoomDialog = ({openDialog, setOpenDialog}:{openDialog:boolean,setOpenDialog:any}) => {


    const handleClose = (__event:any,reason:any) => {
        if (reason && reason === "backdropClick")
        return;
        setOpenDialog(false);
    };

    return <div>
        <Dialog
        open={openDialog}
        onClose={(e,reason)=>{handleClose(e,reason)}}
        disableEscapeKeyDown={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Play with friends"}
        </DialogTitle>
        <DialogContent>
            <div className='room-container d-flex gap-1'>
                <div className='room-create-container'>
                    <Button variant="outlined" size="medium" onClick={handleClose}>Create Room</Button>
                </div>
                <div></div>
                <div className='room-join-container'>
                    <Button variant="outlined" size="medium" onClick={handleClose}>Join Room</Button>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            {/* Add action to close and move to home page */}
        </DialogActions>
      </Dialog>
    </div>
}

export default RoomDialog;