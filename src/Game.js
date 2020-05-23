import React from 'react';
import './Game.css';
import Graph from './Graph';

class Game extends React.Component {
  constructor(props)  {
    super(props);
  }
  
  onClickTypeChanged(new_click_type) {
    console.log("new click type: " + new_click_type);
    this.graph.set_click_type(new_click_type); 
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
    this.graph = new Graph(this.props.onBudgetChanged, this.props.onGameEnd);
    this.graph.start();
  }
}

export default Game;
