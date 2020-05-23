import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
      wins: 0,
      games_in_total: 0,
      not_enough: false,
    };
    this.game_result = "";
    this.click_type = 0;
    this.current_game = React.createRef();
  }
  
  onGameEnd(user_won) {
    console.log("game finished, user won: " + user_won);
    if (user_won) {
      this.game_result = "YOU WON!";
      this.setState({wins: this.state.wins + 1});
    } else
      this.game_result = "YOU LOST!";
    this.setState({game_started: false});
    this.setState({games_in_total: this.state.games_in_total + 1});
  }

  onGameStart() {
    console.log("game started");
    this.setState({game_started: true});
  }

  onBudgetChanged(new_budget) {
    console.log("budget changed: " + new_budget);
    this.setState({budget: new_budget});
  } 

  onClickTypeChanged(new_click_type) {
    console.log("type click changed");
    this.click_type = new_click_type;
    if (this.current_game.current)
      this.current_game.current.onClickTypeChanged(new_click_type);
  }

  onNotEnough() {
    this.setState({not_enough: true});
  }

  hideNem() {
    this.setState({ not_enough: false });
  }

  render() {
    console.log("rerendering");
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
          ref={this.current_game} 
          onBudgetChanged={this.onBudgetChanged.bind(this)}
          onGameEnd={this.onGameEnd.bind(this)}
          onNotEnough={this.onNotEnough.bind(this)}
          initial_click_type={this.click_type}
        >
        </Game>;
    }
    return (
      <main>
      <Modal size="sm" show={this.state.not_enough} onHide={() => {this.hideNem()}} aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Не хватает денег! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Выбери клик подешевле.
        </Modal.Body>
      </Modal>
      	<br/>
      	<br/>
        <Nav className="justify-content-center" justify="true">
          <Nav.Item>
             <Stats wins={this.state.wins} games_in_total={this.state.games_in_total}/>
          </Nav.Item>
          <Nav.Item>
          	<CurrentBudget budget={this.state.budget}/>
          </Nav.Item>
          <Nav.Item>
            <ClickTypeButtons 
              onClickTypeChanged={(new_click_type) => this.onClickTypeChanged(new_click_type)}
            />
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
