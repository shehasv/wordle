import { useEffect, useState, useRef } from 'react';
import './Playground.css';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { words } from '../../words';
import Keyboard from '../Keyboard/Keyboard';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { socket } from '../../socket';


interface KeyBoardMethods {
  highlightKey: (word:string,solution:string) => void;
}


const Playground = () => {

  const childRef = useRef<KeyBoardMethods>(null);
  const location = useLocation();
  const { state } = location;

  const [wordInputs, setWordInputs] = useState(
    Array(6).fill(null).map(() => Array(5).fill(''))
  );
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [gameStatus, setIsGameStatus] = useState({
    finished: false,
    gameOver: false,
    tied: false
  });
  const [wordsList, setWords] = useState<string[]>([]);
  const [solution, setSolution] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false)

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if(state.solution) {
      setSolution(state.solution) 
    } else{
      updateSolution()
    } 
  },[wordsList])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if(numberOfTries == 6){
      if (!gameStatus.finished && state?.mode === 'online' && !gameStatus.gameOver) {
        socket.emit('playerFailed', { roomName: state.roomId });
      }
      setIsGameStatus((currentValue) => {
        return {
          ...currentValue,
          gameOver: true
        }
      })
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wordInputs, numberOfTries, gameStatus.gameOver]);

  useEffect(() => {
    if (state?.mode === 'online') {
      socket.on('opponentWon', () => {
        setIsGameStatus({
          finished: false,
          gameOver: true,
          tied: false
        });
      });
      socket.on('matchTied', () => {
        setIsGameStatus({
          finished: false,
          gameOver: true,
          tied: true
        });
      });
    }

    return () => {
      socket.off('opponentWon');
      socket.off('matchTied');
    }
  }, [state?.mode]);

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
      gameOver: false,
      tied: false
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
      const input = wordInputs[numberOfTries].join('')
      if(!wordsList.includes(input) && state.gameLevel != 'easy'){
        setShowSnackbar(true)
      } else{
        validateWord();
        if(input == solution){
          setIsGameStatus({
            finished: true,
            gameOver: true,
            tied: false
          });
          if (state?.mode === 'online') {
            socket.emit('playerWon', { roomName: state.roomId });
          }
        }
        if (childRef.current) {
          childRef.current.highlightKey(input,solution);
        }
        setNumberOfTries((prev) => prev + 1);
      }
    } else {
      // Alert user to complete the word
      setShowSnackbar(true)
      navigator.vibrate(500);
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
    if ((isLetter || isEnter || isBackspace) && !gameStatus.gameOver) {
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
    <>
    <div className='playground-main-container'>
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
            <h2>{gameStatus.tied ? 'Match Tied!!' : gameStatus.finished ? 'Impressive!! You Won' : 'Game Over!! You Lost'}</h2>
            {!gameStatus.finished && <div className='solution-container'>
              <span>Solution: </span>
              <span className='solution'>{solution}</span>
            </div> }
            <div className='d-flex gap-1 justify-content-center'>
              <Button variant="outlined" size="medium" onClick={() => startNewGame()}>{gameStatus.finished ? 'NEW GAME' : 'TRY AGAIN'}</Button>
              <Link to={"/"}><Button variant="outlined" size="medium">Home</Button></Link>
            </div>
          </div>}
      </div>

      {!gameStatus.gameOver && <div className='keyboard-container'>
        <Keyboard keyClick={onKeyClick} ref={childRef} ></Keyboard>
      </div>}
    </div>
    <div>
    <Snackbar open={showSnackbar} autoHideDuration={2000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    onClose={() => {
      setShowSnackbar(false)
    }}>
      <Alert
        severity="warning"
        variant="filled"
      >
        Oops! Guess a proper word to keep the game going.
      </Alert>
    </Snackbar>
    </div>
    </>
  );
};

export default Playground;
