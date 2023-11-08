import React, { useState, useEffect, useCallback } from 'react';
import WORDS from './words';
import Keyboard from './Keyboard';
import '../styles/Board.scss';

const initializeGuesses = () => Array.from({ length: 6 }, () => Array(5).fill(''));
const initializeGuessResults = () => initializeGuesses().map(row => row.map(() => ({ letter: '', color: 'black' })));

const Board = () => {
    // State initializations
    const [guesses, setGuesses] = useState(initializeGuesses);
    const [currentRow, setCurrentRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [guessResults, setGuessResults] = useState(initializeGuessResults);
    const [chosenWord, setChosenWord] = useState('');
    const [letterColors, setLetterColors] = useState({});
    const [endGameMessage, setEndGameMessage] = useState('');


    // Utility function to get a new random word
    const getNewWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

    // Initialize a new game
    const initializeGame = useCallback(() => {
        const newWord = getNewWord();
        localStorage.setItem('chosenWord', newWord);
        localStorage.setItem('gameInProgress', 'true');
        setGuesses(initializeGuesses());
        setCurrentRow(0);
        setGuessResults(initializeGuessResults());
        setGameOver(false);
        setChosenWord(newWord);
    }, []);

    // Keyboard input handler for a key click
    const handleKeyClick = useCallback((letter) => {
        if (gameOver || guesses[currentRow].join('').length === 5) return;
        
        setGuesses((prevGuesses) => {
            const newGuesses = [...prevGuesses];
            const newRow = [...newGuesses[currentRow]];
        
            const emptyIndex = newRow.indexOf('');
            if (emptyIndex !== -1) {
                newRow[emptyIndex] = letter;
                newGuesses[currentRow] = newRow;
            }
        
            return newGuesses;
        });
    }, [currentRow, gameOver, guesses]);
  
  
    // Keyboard input handler for backspace click
    const handleBackspaceClick = useCallback(() => {
        // Don't do anything if the game is over or if the current row is empty
        if (gameOver || guesses[currentRow].every(cell => cell === '')) return;
      
        setGuesses(prevGuesses => {
        const newGuesses = [...prevGuesses];
        const newRow = [...newGuesses[currentRow]];
      
        // Find the last non-empty cell in the current row and set it to empty
        for (let i = newRow.length - 1; i >= 0; i--) {
            if (newRow[i] !== '') {
                    newRow[i] = '';
                    break; // Exit the loop after clearing the last filled cell
                }
            }
        newGuesses[currentRow] = newRow;
        return newGuesses;
        });
    }, [currentRow, gameOver, guesses]);
      
    // Keyboard input handler for submitting a guess
    const handleSubmitGuess = useCallback(() => {
        // Don't do anything if the game is over or the current guess isn't full
        if (gameOver || guesses[currentRow].indexOf('') !== -1) return;
      
        const currentGuess = guesses[currentRow].join('');
      
        // First, mark all correct letters (green)
        const newGuessResults = currentGuess.split('').map((letter, index) => ({
          letter,
          color: chosenWord[index] === letter ? 'green' : 'grey',
        }));

        // Create an object to count the occurrences of each letter in the chosenWord
        const letterCount = {};
        for (const letter of chosenWord) {
          letterCount[letter] = (letterCount[letter] || 0) + 1;
        }

        const newLetterColors = { ...letterColors };
        newGuessResults.forEach((result) => {
          // Only update the color if it's not already set to green
          if (newLetterColors[result.letter] !== 'green') {
            newLetterColors[result.letter] = result.color;
          }
        });
      
        setLetterColors(newLetterColors);
      
        // Decrement counts for correct letters (green)
        newGuessResults.forEach((result, index) => {
            if (result.color === 'green' && letterCount[result.letter] > 0) {
              letterCount[result.letter]--;
            }
          });
      
        newGuessResults.forEach((result, index) => {
            if (result.color === 'grey' && chosenWord.includes(result.letter) && letterCount[result.letter] > 0) {
              result.color = 'yellow';
              letterCount[result.letter]--;
            }
          });
      
        setGuessResults((prevResults) => {
          const updatedResults = [...prevResults];
          updatedResults[currentRow] = newGuessResults;
          return updatedResults;
        });
        newGuessResults.forEach((result) => {
            // Only update the color if it's not already set to green
            if (newLetterColors[result.letter] !== 'green') {
              newLetterColors[result.letter] = result.color;
            }
          });
        // Check if the guess is correct or if it's the last row
        if (currentGuess === chosenWord) {
            setGameOver(true);
            setEndGameMessage('Congratulations! You guessed the word!');
        } else if (currentRow === 5) {
            setGameOver(true);
            setEndGameMessage(`The correct word was: ${chosenWord}`);
          } else {
            setCurrentRow(currentRow + 1);
          }
      }, [currentRow, gameOver, guesses, chosenWord, letterColors]);
      
      
    const handleResetGame = useCallback(() => {
        // Clear specific game state in local storage
        localStorage.removeItem('guesses');
        localStorage.removeItem('letterColors');
        localStorage.removeItem('currentRow');
        localStorage.removeItem('guessResults');
        localStorage.removeItem('chosenWord');
        localStorage.removeItem('gameInProgress');
            
        setGuesses(initializeGuesses());
        setLetterColors({});
        // ... inside handleResetGame ...
        setEndGameMessage(''); // Add this line
        // Re-initialize the game state
        initializeGame();
    }, [initializeGame]);     

    // Load the state from local storage on component mount
    useEffect(() => {
        // Check if a game is in progress
        const gameInProgress = localStorage.getItem('gameInProgress') === 'true';
        
        if (gameInProgress) {
          // Load the game state from local storage
          const savedGuesses = JSON.parse(localStorage.getItem('guesses')) || initializeGuesses();
          const savedCurrentRow = parseInt(localStorage.getItem('currentRow'), 10) || 0;
          const savedGuessResults = JSON.parse(localStorage.getItem('guessResults')) || initializeGuessResults();
          const savedChosenWord = localStorage.getItem('chosenWord') || '';
          const savedLetterColors = JSON.parse(localStorage.getItem('letterColors')) || {}; // Load letterColors
          
          setGuesses(savedGuesses);
          setCurrentRow(savedCurrentRow);
          setGuessResults(savedGuessResults);
          setChosenWord(savedChosenWord);
          setLetterColors(savedLetterColors); // Set letterColors
        } else {
          // Initialize a new game if there isn't one in progress
          initializeGame();
        }
      }, [initializeGame]);
      


    // Keyboard event
    useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
            return; // Ignore the event if any modifier keys are pressed
          }
        if (gameOver) return; // Ignore keypresses if the game is over
  
        if (event.key === 'Backspace') {
            handleBackspaceClick();
        } else if (event.key === 'Enter') {
            handleSubmitGuess();
        } else {
            const letter = event.key.toUpperCase();
            // Check if the key pressed is a letter and handle it
        if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
            handleKeyClick(letter);
        }
      }
    };
  
    // Add event listener for keydown event
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyClick, handleBackspaceClick, handleSubmitGuess, gameOver]);
  
  // Effect for saving game state to local storage
  useEffect(() => {
    // Save the game state to local storage
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('currentRow', currentRow.toString());
    localStorage.setItem('guessResults', JSON.stringify(guessResults));
    localStorage.setItem('chosenWord', chosenWord);
    localStorage.setItem('gameInProgress', gameOver ? 'false' : 'true');
    localStorage.setItem('letterColors', JSON.stringify(letterColors)); // Save letterColors
  }, [guesses, currentRow, guessResults, chosenWord, gameOver, letterColors]);
  
  

  // Render function
  return (
    <div className="board-container">
      <div className="board">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(5)].map((_, colIndex) => {
              const resultColor = guessResults[rowIndex][colIndex]?.color || 'black';
              return (
                <div key={colIndex} className={`cell cell-${resultColor}`}>
                  {guesses[rowIndex][colIndex]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {endGameMessage && <div className="end-game-message">{endGameMessage}</div>}

      <Keyboard
        onKeyClick={handleKeyClick}
        onEnterClick={handleSubmitGuess}
        onBackspaceClick={handleBackspaceClick}
        letterColors={letterColors} // pass the letterColors state
      />
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
};

export default Board;
