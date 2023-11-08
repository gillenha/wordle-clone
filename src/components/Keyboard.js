import React from 'react';
import PropTypes from 'prop-types';

// The Keyboard component should accept props for the event handlers
const Keyboard = ({ onKeyClick, onEnterClick, onBackspaceClick, letterColors }) => {
    // Helper function to get the class name based on the letter color
    const getKeyClassName = (letter) => {
      const color = letterColors[letter];
      return `key ${color ? `key-${color}` : ''}`.trim();
    };
  
  return (
    <div className="keyboard-container">
        <div className="keyboard">
            {/* First Row: 10 keys */}
            <div className={getKeyClassName('Q')} onClick={() => onKeyClick('Q')}>Q</div>
            <div className={getKeyClassName('W')} onClick={() => onKeyClick('W')}>W</div>
            <div className={getKeyClassName('E')} onClick={() => onKeyClick('E')}>E</div>
            <div className={getKeyClassName('R')} onClick={() => onKeyClick('R')}>R</div>
            <div className={getKeyClassName('T')} onClick={() => onKeyClick('T')}>T</div>
            <div className={getKeyClassName('Y')} onClick={() => onKeyClick('Y')}>Y</div>
            <div className={getKeyClassName('U')} onClick={() => onKeyClick('U')}>U</div>
            <div className={getKeyClassName('I')} onClick={() => onKeyClick('I')}>I</div>
            <div className={getKeyClassName('O')} onClick={() => onKeyClick('O')}>O</div>
            <div className={getKeyClassName('P')} onClick={() => onKeyClick('P')}>P</div>

            <div className="break"></div>


            {/* Second Row: 9 keys */}
            <div className={getKeyClassName('A')} onClick={() => onKeyClick('A')}>A</div>
            <div className={getKeyClassName('S')} onClick={() => onKeyClick('S')}>S</div>
            <div className={getKeyClassName('D')} onClick={() => onKeyClick('D')}>D</div>
            <div className={getKeyClassName('F')} onClick={() => onKeyClick('F')}>F</div>
            <div className={getKeyClassName('G')} onClick={() => onKeyClick('G')}>G</div>
            <div className={getKeyClassName('H')} onClick={() => onKeyClick('H')}>H</div>
            <div className={getKeyClassName('J')} onClick={() => onKeyClick('J')}>J</div>
            <div className={getKeyClassName('K')} onClick={() => onKeyClick('K')}>K</div>
            <div className={getKeyClassName('L')} onClick={() => onKeyClick('L')}>L</div>

            <div className="break"></div>


            {/* Third Row: 9 keys including Enter and Backspace */}
            <div className="key enter-key" onClick={() => onEnterClick()}>Enter</div>
            <div className={getKeyClassName('Z')} onClick={() => onKeyClick('Z')}>Z</div>
            <div className={getKeyClassName('X')} onClick={() => onKeyClick('X')}>X</div>
            <div className={getKeyClassName('C')} onClick={() => onKeyClick('C')}>C</div>
            <div className={getKeyClassName('V')} onClick={() => onKeyClick('V')}>V</div>
            <div className={getKeyClassName('B')} onClick={() => onKeyClick('B')}>B</div>
            <div className={getKeyClassName('N')} onClick={() => onKeyClick('N')}>N</div>
            <div className={getKeyClassName('M')} onClick={() => onKeyClick('M')}>M</div>
            <div className="key backspace-key" onClick={() => onBackspaceClick()}>{'<'}</div>
            <div className="break"></div>
        </div>
    </div>
  );
};
Keyboard.propTypes = {
    onKeyClick: PropTypes.func.isRequired,
    onEnterClick: PropTypes.func.isRequired,
    onBackspaceClick: PropTypes.func.isRequired,
    letterColors: PropTypes.object // Add the prop type for letterColors
  };
export default Keyboard;