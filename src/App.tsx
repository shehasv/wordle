import { useEffect, useState } from 'react';
import './App.css';
import Playground from './components/Playground/Playground';

const WORDS_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';

function App() {
  const [wordsList, setWords] = useState([]);
  const [solution, setSolution] = useState('');

  const fetchWords = async () => {
    const data = await fetch(WORDS_API_URL);
    const wordsList = await data.json();
    setWords(wordsList);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    setSolution(
      wordsList[Math.floor(Math.random() * (wordsList.length - 0 + 1) + 0)]
    );
  },[wordsList])

  return (
    <div>
      <Playground solution={solution} />
    </div>
  );
}

export default App;
