import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Game from './Game';
import ClickTypeButtons from './ClickTypeButtons';
import CurrentBudget from './CurrentBudget';
import Stats from './Stats';

class GameWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_started: false,
      budget: 0,
    };
    this.game_result = "";
  }
  
  onGameEnd(user_won) {
    console.log("game finished, user won: " + user_won);
    if (user_won)
      this.game_result = "YOU WON!";
    else
      this.game_result = "YOU LOST!";
    this.setState({game_started: false});
  }

  onGameStart() {
    console.log("game started");
    this.setState({game_started: true});
  }

  onBudgetChanged(new_budget) {
    console.log("budget changed");
    this.setState({budget: new_budget});
  } 

  render() {
    let game_content;
    if (!this.state.game_started) {
      game_content = 
        <div>
          <div>{this.game_result}</div>
          <Button 
            onClick={() => this.onGameStart()}
          > 
            Начни заражать всех 
          </Button>
        </div>
    } else {
      game_content = 
        <Game 
          onBudgetChanged={this.onBudgetChanged.bind(this)}
          onGameEnd={this.onGameEnd.bind(this)}
        >
        </Game>; 
    }
    return (
      <main>
      	<br/>
      	<br/>
        <Nav className="justify-content-center" justify="true">
          <Nav.Item>
             <Stats />
          </Nav.Item>
          <Nav.Item>
          	<CurrentBudget budget={this.state.budget}/>
          </Nav.Item>
          <Nav.Item>
            <ClickTypeButtons/>
          </Nav.Item>
        </Nav>
        <br/>
        <br/>
        {game_content}
      </main>
    );
  }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(GameWrapper), domContainer);

export default GameWrapper;
