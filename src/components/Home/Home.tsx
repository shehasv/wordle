import './Home.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Home() {
    return <div>
        <Link to={"/play"}><Button variant="outlined" size="large">Play</Button></Link>
    </div>
}

export default Home