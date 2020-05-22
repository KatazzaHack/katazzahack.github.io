import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Game from './Game';
import ClickTypeButtons from './ClickTypeButtons';

class GameWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_started: false,
    };
  }
  
  render() {
    let game_content;
    if (!this.state.game_started) {
      game_content = 
        <Button onClick={() => this.onGameStart()}> Начни блять игру </Button>;
    } else {
      game_content = 
        <Game onEnd={() => this.OnGameEnd()}></Game>; 
    }
    return (
      <div>
        <nav>
          <p> Stats </p>
          <p> Current budget </p>
          <ClickTypeButtons/>
        </nav>
        {game_content}
      </div>
    );
  }

  onGameStart() {
    console.log("game started");
    this.setState({game_started: true});
  }

  onGameEnd() {
    this.setState({game_started: false});
  }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(GameWrapper), domContainer);

export default GameWrapper;
