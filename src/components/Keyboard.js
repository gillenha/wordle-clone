import React from 'react';
import PropTypes from 'prop-types';

// The Keyboard component should accept props for the event handlers
const Keyboard = ({ onKeyClick, onEnterClick, onBackspaceClick }) => {
  return (
    <div className="keyboard-container">
        <div className="keyboard">
            {/* First Row: 10 keys */}
            <div className="key" onClick={() => onKeyClick('Q')}>Q</div>
            <div className="key" onClick={() => onKeyClick('W')}>W</div>
            <div className="key" onClick={() => onKeyClick('E')}>E</div>
            <div className="key" onClick={() => onKeyClick('R')}>R</div>
            <div className="key" onClick={() => onKeyClick('T')}>T</div>
            <div className="key" onClick={() => onKeyClick('Y')}>Y</div>
            <div className="key" onClick={() => onKeyClick('U')}>U</div>
            <div className="key" onClick={() => onKeyClick('I')}>I</div>
            <div className="key" onClick={() => onKeyClick('O')}>O</div>
            <div className="key" onClick={() => onKeyClick('P')}>P</div>
            <div className="break"></div>


            {/* Second Row: 9 keys */}
            <div className="key" onClick={() => onKeyClick('A')}>A</div>
            <div className="key" onClick={() => onKeyClick('S')}>S</div>
            <div className="key" onClick={() => onKeyClick('D')}>D</div>
            <div className="key" onClick={() => onKeyClick('F')}>F</div>
            <div className="key" onClick={() => onKeyClick('G')}>G</div>
            <div className="key" onClick={() => onKeyClick('H')}>H</div>
            <div className="key" onClick={() => onKeyClick('J')}>J</div>
            <div className="key" onClick={() => onKeyClick('K')}>K</div>
            <div className="key" onClick={() => onKeyClick('L')}>L</div>
            <div className="break"></div>


            {/* Third Row: 9 keys including Enter and Backspace */}
            <div className="key enter-key" onClick={() => onEnterClick()}>Enter</div>
            <div className="key" onClick={() => onKeyClick('Z')}>Z</div>
            <div className="key" onClick={() => onKeyClick('X')}>X</div>
            <div className="key" onClick={() => onKeyClick('C')}>C</div>
            <div className="key" onClick={() => onKeyClick('V')}>V</div>
            <div className="key" onClick={() => onKeyClick('B')}>B</div>
            <div className="key" onClick={() => onKeyClick('N')}>N</div>
            <div className="key" onClick={() => onKeyClick('M')}>M</div>
            <div className="key backspace-key" onClick={() => onBackspaceClick()}>x</div>
            <div className="break"></div>
        </div>
    </div>
  );
};
Keyboard.propTypes = {
    onKeyClick: PropTypes.func.isRequired,
    onEnterClick: PropTypes.func.isRequired,
    onBackspaceClick: PropTypes.func.isRequired,
  };
export default Keyboard;