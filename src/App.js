import React from 'react';
import './styles/App.scss';
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <h1>Wordle Clone</h1>
      <Board />
    </div>
  );
}

export default App;
