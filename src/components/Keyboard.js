import React from 'react';

// The Keyboard component should accept props for the event handlers
const Keyboard = ({ onKeyClick, onEnterClick, onBackspaceClick }) => {
  return (
<div className="keyboard-container">
<div className="keyboard">
    {/* First Row: 10 keys */}
    <div className="key first-row" onClick={() => onKeyClick('Q')}>Q</div>
    <div className="key first-row" onClick={() => onKeyClick('W')}>W</div>
    <div className="key first-row" onClick={() => onKeyClick('E')}>E</div>
    <div className="key first-row" onClick={() => onKeyClick('R')}>R</div>
    <div className="key first-row" onClick={() => onKeyClick('T')}>T</div>
    <div className="key first-row" onClick={() => onKeyClick('Y')}>Y</div>
    <div className="key first-row" onClick={() => onKeyClick('U')}>U</div>
    <div className="key first-row" onClick={() => onKeyClick('I')}>I</div>
    <div className="key first-row" onClick={() => onKeyClick('O')}>O</div>
    <div className="key first-row" onClick={() => onKeyClick('P')}>P</div>
    <div className="break"></div>


    {/* Second Row: 9 keys */}
    <div className="key second-row" onClick={() => onKeyClick('A')}>A</div>
    <div className="key second-row" onClick={() => onKeyClick('S')}>S</div>
    <div className="key second-row" onClick={() => onKeyClick('D')}>D</div>
    <div className="key second-row" onClick={() => onKeyClick('F')}>F</div>
    <div className="key second-row" onClick={() => onKeyClick('G')}>G</div>
    <div className="key second-row" onClick={() => onKeyClick('H')}>H</div>
    <div className="key second-row" onClick={() => onKeyClick('J')}>J</div>
    <div className="key second-row" onClick={() => onKeyClick('K')}>K</div>
    <div className="key second-row" onClick={() => onKeyClick('L')}>L</div>
    <div className="break"></div>


    {/* Third Row: 9 keys including Enter and Backspace */}
    <div className="key enter-key third-row" onClick={() => onEnterClick()}>Enter</div>
    <div className="key third-row" onClick={() => onKeyClick('Z')}>Z</div>
    <div className="key third-row" onClick={() => onKeyClick('X')}>X</div>
    <div className="key third-row" onClick={() => onKeyClick('C')}>C</div>
    <div className="key third-row" onClick={() => onKeyClick('V')}>V</div>
    <div className="key third-row" onClick={() => onKeyClick('B')}>B</div>
    <div className="key third-row" onClick={() => onKeyClick('N')}>N</div>
    <div className="key third-row" onClick={() => onKeyClick('M')}>M</div>
    <div className="key backspace-key third-row" onClick={() => onBackspaceClick()}>x</div>
        <div className="break"></div>
</div>
</div>
  );
};

export default Keyboard;