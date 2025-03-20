import { useEffect, useState } from 'react';
import './Playground.css';

const Playground = () => {
  const [wordInputs, setwordInputs] = useState(
    Array(6).fill(Array(5).fill(''))
  );
  const [numberOfTries, setNumberOfTries] = useState(0);

  const updateCell = (rowIndex, colIndex, newValue) => {
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
        const availedSpace = wordInputs[numberOfTries].findIndex(
          (letter: string) => !letter
        );
        updateCell(numberOfTries, availedSpace, event.key.toUpperCase());
      }
    }

    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wordInputs]);

  return (
    <div>
      {wordInputs.map((row: Array<string>) => (
        <div className="word-row">
          {row.map((word: string) => (
            <div className="word-column"> {word} </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Playground;
