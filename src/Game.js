import React from 'react';
import logo from './logo.svg';
import './Game.css';

function Game() {
  return (
    <div className="Game">
      <header className="Game-header">
        <img src={logo} className="Game-logo" alt="logo" />
        <p>
          Edit <code>src/Game.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default Game;
