import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './HowToPlayDialog.css';

interface HowToPlayDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const HowToPlayDialog = ({ openDialog, setOpenDialog }: HowToPlayDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="how-to-play-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="how-to-play-dialog-title" className="htp-dialog-title">
                📖 How To Play
            </DialogTitle>
            <DialogContent dividers>
                <div className="htp-content-container">
                    <section className="htp-section">
                        <h3>Single Player Mode</h3>
                        <p>Guess the Word in 6 tries.</p>
                        <ul>
                            <li>Each guess must be a valid 5-letter word.</li>
                            <li>The color of the tiles will change to show how close your guess was to the word.</li>
                        </ul>
                        
                        <div className="htp-examples">
                            <p><strong>Examples</strong></p>
                            
                            <div className="htp-example">
                                <div className="htp-word-row">
                                    <div className="htp-letter correct">W</div>
                                    <div className="htp-letter">E</div>
                                    <div className="htp-letter">A</div>
                                    <div className="htp-letter">R</div>
                                    <div className="htp-letter">Y</div>
                                </div>
                                <p><strong>W</strong> is in the word and in the correct spot.</p>
                            </div>

                            <div className="htp-example">
                                <div className="htp-word-row">
                                    <div className="htp-letter">P</div>
                                    <div className="htp-letter present">I</div>
                                    <div className="htp-letter">L</div>
                                    <div className="htp-letter">L</div>
                                    <div className="htp-letter">S</div>
                                </div>
                                <p><strong>I</strong> is in the word but in the wrong spot.</p>
                            </div>

                            <div className="htp-example">
                                <div className="htp-word-row">
                                    <div className="htp-letter">V</div>
                                    <div className="htp-letter">A</div>
                                    <div className="htp-letter absent">G</div>
                                    <div className="htp-letter">U</div>
                                    <div className="htp-letter">E</div>
                                </div>
                                <p><strong>G</strong> is not in the word in any spot.</p>
                            </div>
                        </div>
                    </section>

                    <section className="htp-section">
                        <h3>Multiplayer Mode</h3>
                        <p>Challenge a friend in real-time!</p>
                        <ul>
                            <li><strong>Host a Game:</strong> Generate a room code and share it with your opponent.</li>
                            <li><strong>Join a Game:</strong> Enter the room code provided by the host.</li>
                            <li><strong>Winning:</strong> The first player to correctly guess the word wins the match!</li>
                        </ul>
                    </section>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Got It!</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HowToPlayDialog;
