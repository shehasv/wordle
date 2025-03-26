import { useEffect, useState } from 'react';
import './Playground.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { words } from '../../words';
import Keyboard from '../Keyboard/Keyboard';


const Playground = () => {
  const [wordInputs, setWordInputs] = useState(
    Array(6).fill(null).map(() => Array(5).fill(''))
  );
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [gameStatus, setIsGameStatus] = useState({
    finished: false,
    gameOver: false
  });
  const [wordsList, setWords] = useState<string[]>([]);
  const [solution, setSolution] = useState('');

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    updateSolution();
  },[wordsList])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if(numberOfTries == 6){
      setIsGameStatus((currentValue) => {
        return {
          ...currentValue,
          gameOver: true
        }
      })
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wordInputs, numberOfTries]);

  const fetchWords = () => {
    setWords(words);
  };

  const startNewGame = () => {
    setNumberOfTries(0);
    setWordInputs(Array(6).fill(null).map(() => Array(5).fill('')));
    wordInputs.forEach((word,rowInd) =>{
      word.forEach((_letter,cellInd)=>{
        const elem = document.getElementById('cell'+rowInd+cellInd);
        elem?.classList.remove(...elem.classList);
        elem?.classList.add('word-letter');
      })
    })
    setIsGameStatus({
      finished: false,
      gameOver: false
    });
    updateSolution();
  }

  const updateSolution = () => {
    setSolution(
      wordsList[Math.floor(Math.random() * (wordsList.length - 0 + 1) + 0)]?.toUpperCase()
    );
  }

  const updateCell = (rowIndex: number, colIndex: number, newValue: string) => {
    setWordInputs((prevWordInputs) => {
      const newWordInputs = prevWordInputs.map((row) => [...row]);
      newWordInputs[rowIndex][colIndex] = newValue;
      return newWordInputs;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const isLetter: boolean = /^[a-zA-Z]$/.test(event.key);
    const isEnter: boolean = event.key === 'Enter';
    const isBackspace: boolean = event.key === 'Backspace';

    hanldeKeyClick(isLetter, isEnter, isBackspace, event?.key)

    event.preventDefault();
    event.stopPropagation();
  };

  const checkGameOver = () => {
    
    if (wordInputs[numberOfTries].every((item: string) => item)) {
      validateWord();
      if(wordInputs[numberOfTries].join('') == solution){
        setIsGameStatus({
          finished: true,
          gameOver: true
        });
      }
      setNumberOfTries((prev) => prev + 1);
    } else {
      // Alert user to complete the word
    }
  };

  const validateWord = () => {
    const solutionArray = solution.split('');
    wordInputs[numberOfTries].forEach((letter: string, index: number) => {
      const cell = document.getElementById('cell' + numberOfTries + index);
      if (letter == solutionArray[index]) {
        if (cell) cell.classList.add('correct');
      } else if (solutionArray.includes(letter)) {
        if (cell) cell.classList.add('close');
      } else {
        if (cell) cell.classList.add('incorrect');
      }
    });
  };

  function onKeyClick(key:any){
    const isLetter: boolean = /^[a-zA-Z]$/.test(key);
    const isEnter: boolean = key === '✅';
    const isBackspace: boolean = key === '🔙';

    hanldeKeyClick(isLetter, isEnter, isBackspace, key)
  }
  
  function hanldeKeyClick(isLetter:boolean, isEnter:boolean, isBackspace:boolean, key:string){
    if (isLetter || isEnter || isBackspace) {
      if (isLetter) {
        const availedIndex = wordInputs[numberOfTries].findIndex(
          (letter: string) => !letter
        );
        updateCell(numberOfTries, availedIndex, key.toUpperCase());
      } else if (isBackspace) {
        const removeIndex = wordInputs[numberOfTries].findLastIndex(
          (letter: string) => letter
        );
        updateCell(numberOfTries, removeIndex, '');
      } else {
        checkGameOver();
      }
    }
  } 

  

  return (
    <div className='playground-main-container'>
      {solution}
      <div className='grid-container'>
        {solution && wordInputs.map((row: Array<string>, rowIndex: number) => (
          <div className="word-row" key={rowIndex}>
            {row.map((word: string, letterIndex: number) => (
              <div className="word-letter" id={'cell' + rowIndex + letterIndex} key={`${rowIndex}-${letterIndex}`}>
                {' '}
                {word}{' '}
              </div>
            ))}
          </div>
        ))}
        {gameStatus.gameOver && <div>
            <h2>{gameStatus.finished ? 'Impressive!! You Won' : 'Game Over!! You Lost'}</h2>
            <div className='d-flex gap-1 justify-content-center'>
              <Button variant="outlined" size="medium" onClick={() => startNewGame()}>{gameStatus.finished ? 'NEW GAME' : 'TRY AGAIN'}</Button>
              <Link to={"/"}><Button variant="outlined" size="medium">Home</Button></Link>
            </div>
          </div>}
      </div>

      {!gameStatus.gameOver && <div className='keyboard-container'>
        <Keyboard keyClick={onKeyClick}></Keyboard>
      </div>}
    </div>
  );
};

export default Playground;
