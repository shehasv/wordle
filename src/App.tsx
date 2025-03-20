import { useEffect, useState } from 'react';
import './App.css';
import Playground from './components/Playground/Playground';

const WORDS_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';

function App() {
  const [words, setWords] = useState();
  const [solution, setSolution] = useState('');

  const fetchWords = async () => {
    const data = await fetch(WORDS_API_URL);
    const wordsList = await data.json();
    setWords(wordsList);
    setSolution(
      wordsList[Math.floor(Math.random() * (wordsList.length - 0 + 1) + 0)]
    );
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div>
      <Playground />
      {solution}
    </div>
  );
}

export default App;
