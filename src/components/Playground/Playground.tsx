import React, { useEffect, useState } from 'react';
import './Playground.css';

interface Playground {
  solution: string
}

const Playground:React.FC<Playground> = ({ solution }) => {
  const [wordInputs, setwordInputs] = useState(
    Array(6).fill(Array(5).fill(''))
  );
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false)


  const startGame = () => {
    setIsGameOver(false)
    setNumberOfTries(0)
    setwordInputs(Array(6).fill(Array(5).fill('')))
    wordInputs.forEach((word,rowIndex)=>{
      word.forEach((letter:string,cellIndex:number)=>{
        const elem = document.getElementById('cell' + rowIndex + cellIndex);
        elem?.classList.remove(...elem.classList)
        elem?.classList.add('word-letter')
      })
    })
  }

  const updateCell = (rowIndex: number, colIndex: number, newValue: string) => {
    setwordInputs((prevWordInputs) => {
      const newWordInputs = prevWordInputs.map((row) => [...row]);
      newWordInputs[rowIndex][colIndex] = newValue;
      return newWordInputs;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const isLetter: boolean = /^[a-zA-Z]$/.test(event.key);
    const isEnter: boolean = event.key === 'Enter';
    const isBackspace: boolean = event.key === 'Backspace';

    if (isLetter || isEnter || isBackspace) {
      if (isLetter) {
        const availedIndex = wordInputs[numberOfTries].findIndex(
          (letter: string) => !letter
        );
        updateCell(numberOfTries, availedIndex, event.key.toUpperCase());
      } else if (isBackspace) {
        const removeIndex = wordInputs[numberOfTries].findLastIndex(
          (letter: string) => letter
        );
        updateCell(numberOfTries, removeIndex, '');
      } else {
        checkGameOver();
      }
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const checkGameOver = () => {
    if (wordInputs[numberOfTries].every((item: string) => item)) {
      validateWord();
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

  useEffect(() => {

    if(numberOfTries == 6){
      setIsGameOver(true)
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wordInputs, numberOfTries]);

  return (
    <div>
      {wordInputs.map((row: Array<string>, rowIndex: number) => (
        <div className="word-row">
          {row.map((word: string, letterIndex: number) => (
            <div className="word-letter" id={'cell' + rowIndex + letterIndex}>
              {' '}
              {word}{' '}
            </div>
          ))}
        </div>
      ))}
      {
        isGameOver && 
        <div>
          <h2>Game over!!</h2>
          <button onClick={() => startGame()}>Play again</button>
        </div>
      }
    </div>
  );
};

export default Playground;
