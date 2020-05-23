import React from 'react';
import './Game.css';
import Graph from './Graph';

class Game extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {
    return <div 
      id="game-container" 
       class="main" 
       width="100" 
       height="100" 
    > 
      Game should be here 
    </div>;
  }

  componentDidMount() {
    this.graph = new Graph((user_won) => {this.props.onGameEnd(user_won)});
    this.graph.start();
  }
}

export default Game;
