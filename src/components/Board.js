import React, { useState, useEffect, useCallback } from 'react';
import Keyboard from './Keyboard';
import '../styles/Board.scss';

const Board = () => {
    const [guesses, setGuesses] = useState(() => Array(6).fill(Array(5).fill('')));
    const [currentRow, setCurrentRow] = useState(0); // starting with the first row
    // const createEmptyBoard = () => Array(6).fill(null).map(() => Array(5).fill(''));
      
    // For handleKeyClick, you want to ensure you're not mutating the state directly.
    // Instead, you should create a copy of the row you're updating.
    const handleKeyClick = useCallback((letter) => {
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
    },[currentRow]);

    const handleBackspaceClick = () => {
        setGuesses(prevGuesses => {
            // Copy the current row
            const newRow = [...prevGuesses[currentRow]];
            // Find the last non-empty cell in the current row and set it to empty
            for (let i = newRow.length - 1; i >= 0; i--) {
                if (newRow[i] !== '') {
                    newRow[i] = '';
                    break;
                }
            }
            // Now create a new array for the guesses to update the state immutably
            const newGuesses = prevGuesses.map((guess, index) => 
                index === currentRow ? newRow : guess
            );
            return newGuesses;
        });
    };
    
    

    // Update handleSubmitGuess similarly
    const handleSubmitGuess = () => {
        if (currentRow < 6) {
            const currentGuess = guesses[currentRow].join(''); // Convert the array of letters to a string
    
            if (currentGuess.length === 5) {
                console.log('Guess submitted:', currentGuess);
                // Move to the next row only if the currentRow is less than 5
                if (currentRow < 5) {
                    setCurrentRow(prevRow => prevRow + 1);
                } else {
                    // If the currentRow is 5, this means the user has used all their guesses and should not be able to guess anymore
                    console.log('All guesses used. Please refresh the page.');
                }
            } else {
                console.log('A guess must be 5 letters.');
            }
        } else {
            console.log('No more guesses allowed. Please refresh the page.');
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
                handleBackspaceClick();
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [guesses, currentRow]); // Include dependencies here
    
    
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
        <Keyboard
            onKeyClick={handleKeyClick}
            onEnterClick={handleEnterClick}
            onBackspaceClick={handleBackspaceClick}
        />
    </div>
  );
}

export default Board;
//this should be missing