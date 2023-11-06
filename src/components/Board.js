import React, { useState, useEffect } from 'react';
import '../styles/Board.scss';

function Board() {
    const [guesses, setGuesses] = useState(Array(6).fill(Array(5).fill(''))); // 6 rows, 5 columns filled with empty strings
    const [currentRow, setCurrentRow] = useState(0); // starting with the first row
    const resetGame = () => {
        setGuesses(Array(6).fill(Array(5).fill('')));
        setCurrentRow(0);
        // Reset any other states as necessary
      };
      
        // For handleKeyClick, you want to ensure you're not mutating the state directly.
        // Instead, you should create a copy of the row you're updating.
    const handleKeyClick = (letter) => {
        setGuesses(prevGuesses => {
            // Copy the current row
            const newRow = [...prevGuesses[currentRow]];
            // Find the first empty cell in the current row
            const emptyIndex = newRow.indexOf('');
            
            if (emptyIndex !== -1) {
                // Update the copy with the new letter
                newRow[emptyIndex] = letter;
                // Now create a new array for the guesses to update the state immutably
                const newGuesses = prevGuesses.map((guess, index) => 
                    index === currentRow ? newRow : guess
                );
                return newGuesses;
            }
            return prevGuesses; // In case there's no empty space, return the previous guesses unchanged
        });
    };

    // For handleBackspaceClick, ensure you're creating a new copy of guesses and then updating the state.
    const handleBackspaceClick = () => {
        setGuesses(prevGuesses => {
            // Copy the current row
            const newRow = [...prevGuesses[currentRow]];
            // Remove the last letter
            newRow.pop();
            // Fill in the space with an empty string
            newRow.push('');
            // Now create a new array for the guesses to update the state immutably
            const newGuesses = prevGuesses.map((guess, index) => 
                index === currentRow ? newRow : guess
            );
            return newGuesses;
        });
    };

    // Update handleSubmitGuess similarly
    const handleSubmitGuess = () => {
        const currentGuess = guesses[currentRow].join(''); // Convert the array of letters to a string

        if (currentGuess.length === 5) {
            console.log('Guess submitted:', currentGuess);
            // Move to the next row
            setCurrentRow(currentRow + 1);
        } else {
            console.log('A guess must be 5 letters.');
        }
    };

    
    const handleEnterClick = () => {
        // Call the handleSubmitGuess function
        handleSubmitGuess();
    };
    
    // Add these click handlers to your buttons in the render method

    useEffect(() => {
        const handleKeyDown = (event) => {
            const validKeys = "QWERTYUIOPASDFGHJKLZXCVBNM"; // Allowed keys for Wordle
            if (validKeys.includes(event.key.toUpperCase())) {
                handleKeyClick(event.key.toUpperCase());
            } else if (event.key === 'Enter') {
                handleSubmitGuess();
            } else if (event.key === 'Backspace') {
                setGuesses(prevGuesses => {
                    const newGuesses = [...prevGuesses];
                    const newRow = [...newGuesses[currentRow]]; // Ensure a deep copy is made
                    newRow.pop(); // Remove the last element
                    newRow.push(''); // Add an empty string to keep the array's length consistent
                    newGuesses[currentRow] = newRow;
                    return newGuesses;
                });
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentRow, guesses]); // Add the dependencies here
      

    useEffect(() => {
        // Load saved game state from local storage when the component mounts
        const savedGuesses = JSON.parse(localStorage.getItem('guesses'));
        const savedCurrentRow = parseInt(localStorage.getItem('currentRow'), 10);
      
        if (savedGuesses && savedGuesses.length) {
          setGuesses(savedGuesses);
        }
        if (!isNaN(savedCurrentRow)) {
          setCurrentRow(savedCurrentRow);
        }
        // ... Rest of your code to handle keydown events
      }, []); // This will run only once when the component mounts
    
      useEffect(() => {
        // Save game state to local storage on guesses or currentRow change
        localStorage.setItem('guesses', JSON.stringify(guesses));
        localStorage.setItem('currentRow', currentRow.toString());
      }, [guesses, currentRow]); // This will run whenever guesses or currentRow changes
        
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
            <div className="key enter-key third-row" onClick={() => handleEnterClick()}>Enter</div>
            <div className="key third-row" onClick={() => handleKeyClick('Z')}>Z</div>
            <div className="key third-row" onClick={() => handleKeyClick('X')}>X</div>
            <div className="key third-row" onClick={() => handleKeyClick('C')}>C</div>
            <div className="key third-row" onClick={() => handleKeyClick('V')}>V</div>
            <div className="key third-row" onClick={() => handleKeyClick('B')}>B</div>
            <div className="key third-row" onClick={() => handleKeyClick('N')}>N</div>
            <div className="key third-row" onClick={() => handleKeyClick('M')}>M</div>
            <div className="key backspace-key third-row" onClick={() => handleBackspaceClick()}>x</div>
                <div className="break"></div>
                <button onClick={resetGame}>Reset Game</button>

        </div>
        </div>

    </div>
  );
}

export default Board;
