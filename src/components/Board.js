import React, { useState, useEffect } from 'react';
import '../styles/Board.scss';

function Board() {
    const [guesses, setGuesses] = useState(Array(6).fill(Array(5).fill(''))); // 6 rows, 5 columns filled with empty strings
    const [currentRow, setCurrentRow] = useState(0); // starting with the first row
    const handleKeyClick = (letter) => {
        console.log(letter);  // This will log the clicked letter to the console
    
        setGuesses(prevGuesses => {
          const newGuess = [...prevGuesses[currentRow]];
          const emptyIndex = newGuess.indexOf(''); // find the first empty cell in the current row
      
          if (emptyIndex !== -1) {
            newGuess[emptyIndex] = letter;
          }
      
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[currentRow] = newGuess;
          console.log(updatedGuesses);
          return updatedGuesses;
        });
    }

    
    useEffect(() => {
        const handleKeyDown = (event) => {
            const validKeys = "QWERTYUIOPASDFGHJKLZXCVBNM"; // Allowed keys for Wordle
            if (validKeys.includes(event.key.toUpperCase())) {
                handleKeyClick(event.key.toUpperCase());
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);  // Empty dependency array to ensure this effect runs only once when the component mounts
      
    return (
    <div className="board-container">
      <div className="board">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(5)].map((_, colIndex) => (
              <div key={colIndex} className="cell">{guesses[rowIndex][colIndex]}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Keyboard */}
      <div className="keyboard-container">
      <div className="keyboard">
        {/* First Row: 10 keys */}
        <div className="key first-row" onClick={() => handleKeyClick('Q')}>Q</div>
        <div className="key first-row" onClick={() => handleKeyClick('W')}>W</div>
        <div className="key first-row" onClick={() => handleKeyClick('E')}>E</div>
        <div className="key first-row" onClick={() => handleKeyClick('R')}>R</div>
        <div className="key first-row" onClick={() => handleKeyClick('T')}>T</div>
        <div className="key first-row" onClick={() => handleKeyClick('Y')}>Y</div>
        <div className="key first-row" onClick={() => handleKeyClick('U')}>U</div>
        <div className="key first-row" onClick={() => handleKeyClick('I')}>I</div>
        <div className="key first-row" onClick={() => handleKeyClick('O')}>O</div>
        <div className="key first-row" onClick={() => handleKeyClick('P')}>P</div>
        <div className="break"></div>


        {/* Second Row: 9 keys */}
        <div className="key second-row" onClick={() => handleKeyClick('A')}>A</div>
        <div className="key second-row" onClick={() => handleKeyClick('S')}>S</div>
        <div className="key second-row" onClick={() => handleKeyClick('D')}>D</div>
        <div className="key second-row" onClick={() => handleKeyClick('F')}>F</div>
        <div className="key second-row" onClick={() => handleKeyClick('G')}>G</div>
        <div className="key second-row" onClick={() => handleKeyClick('H')}>H</div>
        <div className="key second-row" onClick={() => handleKeyClick('J')}>J</div>
        <div className="key second-row" onClick={() => handleKeyClick('K')}>K</div>
        <div className="key second-row" onClick={() => handleKeyClick('L')}>L</div>
        <div className="break"></div>


        {/* Third Row: 9 keys including Enter and Backspace */}
        <div className="key enter-key third-row" onClick={() => handleKeyClick('enter')}>Enter</div>
        <div className="key third-row" onClick={() => handleKeyClick('Z')}>Z</div>
        <div className="key third-row" onClick={() => handleKeyClick('X')}>X</div>
        <div className="key third-row" onClick={() => handleKeyClick('C')}>C</div>
        <div className="key third-row" onClick={() => handleKeyClick('V')}>V</div>
        <div className="key third-row" onClick={() => handleKeyClick('B')}>B</div>
        <div className="key third-row" onClick={() => handleKeyClick('N')}>N</div>
        <div className="key third-row" onClick={() => handleKeyClick('M')}>M</div>
        <div className="key backspace-key third-row" onClick={() => handleKeyClick('backspace')}>x</div>
            <div className="break"></div>

      </div>
      </div>

    </div>
  );
}

export default Board;
