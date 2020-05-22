import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Game from './Game';
import ClickTypeButtons from './ClickTypeButtons';

class GameWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_started: false,
    };
  }
  
  onGameEnd() {
    this.setState({game_started: false});
  }

  onGameStart() {
    console.log("game started");
    this.setState({game_started: true});
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
        <Nav>
          <Nav.Item>
              <p> Stats </p>
          </Nav.Item>
          <Nav.Item>
            <p> Current budget </p>
          </Nav.Item>
          <Nav.Item>
            <ClickTypeButtons/>
          </Nav.Item>
        </Nav>,

        {game_content}
      </div>
    );
  }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(GameWrapper), domContainer);

export default GameWrapper;
