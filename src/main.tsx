import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Playground from './components/Playground/Playground.tsx';
import Home from './components/Home/Home.tsx';

const router = createBrowserRouter([
    {path: '/',element: <App />,children: [{
        path: '/', element: <Home />
    },{
        path: 'play', element: <Playground />
    }]}
])

createRoot(document.getElementById('root')!).render(<RouterProvider  router={router}/>);


