import React, { useState, useEffect, useCallback } from 'react';
import Keyboard from './Keyboard';
import WORDS from './words';
import '../styles/Board.scss';

const Board = () => {
    const [guesses, setGuesses] = useState(() => Array(6).fill(Array(5).fill('')));
    const [currentRow, setCurrentRow] = useState(0); // starting with the first row
    const [gameOver, setGameOver] = useState(false);
    const [guessResults, setGuessResults] = useState(() => {
        // Try to load the saved results from local storage, or default to an empty array
        const saved = localStorage.getItem('guessResults');
        return saved ? JSON.parse(saved) : Array(6).fill(Array(5).fill({ letter: '', color: 'black' }));
      });    
    const chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase(); // Randomly select a word from the array
    const emptyGuess = () => Array(5).fill(null).map(() => ({ letter: '', color: 'grey' }));

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
                setGuessResults(prevResults => {
                    const newResults = [...prevResults];
                    newResults[currentRow] = guessCheck;
                    return newResults;
                });
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

    const handleResetGame = useCallback(() => {
        // Clear the localStorage
        localStorage.removeItem('guesses');
        localStorage.removeItem('currentRow');
        localStorage.removeItem('guessResults');
    
        // Reset the game state
        setGuesses(Array(6).fill(Array(5).fill('')));
        setCurrentRow(0);
        setGuessResults(Array(6).fill(Array(5).fill({ letter: '', color: 'grey' })));
        setGameOver(false);
        setGuessResults(Array(6).fill(null).map(emptyGuess));

        
        // Optionally, reset the chosen word
        // chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    }, []);
    
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
        const savedGuessResults = JSON.parse(localStorage.getItem('guessResults'));
        if (savedGuessResults && savedGuessResults.length) {
          setGuessResults(savedGuessResults);
        }
        return () => {
            // ComponentWillUnmount logic here
            // Optionally clear the game state here if you want it to reset on page refresh
            handleResetGame();
        };
    }, [handleResetGame]); // This will run only once when the component mounts
 
    useEffect(() => {
        localStorage.setItem('guessResults', JSON.stringify(guessResults));
      }, [guessResults]);

    return (
        <div className="board-container">
            <div className="board">
            {/* Inside the Board component, where you map over the guesses to create the board */}
                {[...Array(6)].map((_, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {[...Array(5)].map((_, colIndex) => {
                        // Determine the class for the cell based on the guessResults
                        let cellClass = "cell";
                        if (guessResults[rowIndex] && guessResults[rowIndex][colIndex]) {
                            const result = guessResults[rowIndex][colIndex];
                            cellClass += ` cell-${result.color}`; // This will append ' cell-grey', ' cell-yellow', or ' cell-green' to the class
                        }

                        return (
                            <div key={colIndex} className={`cell${guessResults[rowIndex][colIndex].color !== 'black' ? ` cell-${guessResults[rowIndex][colIndex].color}` : ''}`}>
                              {guesses[rowIndex][colIndex]}
                            </div>
                          );
                          
                          
                        })}
                    </div>
                ))}
            </div>
                <Keyboard
                    onKeyClick={handleKeyClick}
                    onEnterClick={handleEnterClick}
                    onBackspaceClick={handleBackspaceClick}
                />
                <button onClick={handleResetGame}>Reset Game</button>

    </div>
  );
}

export default Board;
//this should be missing