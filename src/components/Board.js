import React, { useState, useEffect, useCallback } from 'react';
import Keyboard from './Keyboard';
import WORDS from './words';
import '../styles/Board.scss';

const Board = () => {
    const [guesses, setGuesses] = useState(() => Array(6).fill(Array(5).fill('')));
    const [currentRow, setCurrentRow] = useState(0); // starting with the first row
    const [gameOver, setGameOver] = useState(false);
    const chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase(); // Randomly select a word from the array

    // const createEmptyBoard = () => Array(6).fill(null).map(() => Array(5).fill(''));
      
    const checkGuess = useCallback((guess) => {
        const result = [];
      
        // Convert guess and chosenWord to arrays to compare them
        const guessArray = guess.split('');
        const chosenWordArray = chosenWord.split('');
      
        // First pass to check for correct position
        guessArray.forEach((letter, index) => {
          if (letter === chosenWordArray[index]) {
            result.push({ letter, color: 'green' });
            chosenWordArray[index] = null; // Mark this letter as checked
          } else {
            result.push({ letter, color: 'grey' }); // Temporarily mark as grey
          }
        });
      
        // Second pass to check for correct letters in the wrong position
        result.forEach((check, index) => {
          if (check.color === 'grey') {
            const pos = chosenWordArray.indexOf(check.letter);
            if (pos > -1) {
              result[index].color = 'yellow';
              chosenWordArray[pos] = null; // Mark this letter as checked
            }
          }
        });
      
        return result;
      }, [chosenWord]);

      const handleSubmitGuess = useCallback(() => {
        if (!gameOver && currentRow < 6) {
            const currentGuess = guesses[currentRow].join('').toUpperCase(); // Convert the array of letters to a string
    
            if (currentGuess.length === 5) {
                const guessCheck = checkGuess(currentGuess);
                console.log(guessCheck.map(check => check.letter + ':' + check.color));
                if (currentGuess === chosenWord) {
                    console.log('Congratulations! You guessed the word');
                } else {
                    console.log('Incorrect guess:', currentGuess);
                    if (currentRow < 5) {
                        setCurrentRow(prevRow => prevRow + 1);
                    } else {
                        console.log('All guesses used. Please refresh the page')
                    }
                }
            } else {
                console.log('A guess must be 5 letters.');
            }
            if (currentRow === 5) {
                setGameOver(true);
                console.log('All guesses allowed. Please refresh the page')
            }
        } else {
            console.log('No more guesses allowed. Please refresh the page.');
        }
    }, [guesses, currentRow, chosenWord, gameOver, setGameOver, checkGuess]);
    
    // For handleKeyClick, you want to ensure you're not mutating the state directly.
    // Instead, you should create a copy of the row you're updating.
    const handleKeyClick = useCallback((letter) => {
        if (!gameOver) {
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
        }
    },[currentRow, gameOver]);

    const handleBackspaceClick = useCallback(() => {
        if (!gameOver && currentRow < 6) {
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
        }
        
    },[currentRow, gameOver]);
      
    // Update handleSubmitGuess similarly

    
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
    }, [handleKeyClick, handleBackspaceClick, handleSubmitGuess]); // Include dependencies here
    
    
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