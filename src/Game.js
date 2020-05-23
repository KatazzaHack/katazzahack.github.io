import React from 'react';
import './Game.css';
import Graph from './Graph';

class Game extends React.Component {
  constructor(props)  {
    super(props);
    this.current_click_type = this.props.initial_click_type;
  }
  
  onClickTypeChanged(new_click_type) {
    console.log("new click type: " + new_click_type);
    this.current_click_type = new_click_type;
    this.graph.set_click_type(new_click_type); 
  }

  onGameReset() {
    delete this.graph;
    this.createGraph();
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

  createGraph() {
    this.graph = new Graph(this.props.onBudgetChanged, this.props.onGameEnd, this.props.onNotEnough);
    this.graph.start();
    this.graph.set_click_type(this.current_click_type);
  }

  componentDidMount() {
    this.createGraph();
  }
}

export default Game;
