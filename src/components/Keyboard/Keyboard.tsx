import './Keyboard.css';
import Button from '@mui/material/Button';

const topRow = ['Q','W','E','R','T','Y','U','I','O','P','🔙'];
const midRow = ['A','S','D','F','G','H','J','K','L','✅'];
const lowRow = ['Z','X','C','V','B','N','M',];

interface keyboard {
    keyClick:any
}

const Keyboard:React.FC<keyboard> = ({keyClick}) => {

    return <div className='main-container d-flex'>
        <div className='row row-1 d-flex'>
            {topRow.map((key) => <Button variant="outlined" size="small" className='key' key={key} onClick={((event)=> keyClick(event))}>{key}</Button>)}
        </div>
        <div className='row row-2 d-flex'>
            {midRow.map((key) => <Button variant="outlined" size="small" className='key' key={key} onClick={((event)=> keyClick(event))}>{key}</Button>)}
        </div>
        <div className='row row-3 d-flex'>
            {lowRow.map((key) => <Button variant="outlined" size="small"className='key' key={key} onClick={((event)=> keyClick(event))}>{key}</Button>)}
        </div>
    </div>
}

export default Keyboard;