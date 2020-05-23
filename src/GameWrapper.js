import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
      game_just_finished: false,
      last_game_user_won: 0,
    };
    this.game_result = "";
    this.click_type = 0;
    this.current_game = React.createRef();
  }
  
  onGameEnd(user_won) {
    console.log("game finished, user won: " + user_won);
    if (user_won) {
      this.setState({wins: this.state.wins + 1});
    }
    this.setState({game_started: false, games_in_total: this.state.games_in_total + 1, game_just_finished: user_won != null, last_game_user_won: user_won});
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

  onGameRestart() {
    console.log("game reset");
    this.onGameEnd();
    this.onGameStart();
    this.current_game.current.onGameRestart();
  }

  onGameReset() {
    this.onGameEnd();
    this.onGameStart();
    this.current_game.current.onGameReset();
  }

  onNotEnough() {
    this.setState({not_enough: true});
  }

  hideNem() {
    this.setState({ not_enough: false });
  }

  hideResultPopup() {
    this.setState({ game_just_finished: false });
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
        <div>
          <ButtonGroup size="sm">
            <Button onClick={() => this.onGameReset()}>
              Сбросить уровень
            </Button>
            <Button onClick={() => this.onGameRestart()}>
              Начну новый уровень
            </Button>
          </ButtonGroup>
          <br/>
          <Game
            ref={this.current_game} 
            onBudgetChanged={this.onBudgetChanged.bind(this)}
            onGameEnd={this.onGameEnd.bind(this)}
            onNotEnough={this.onNotEnough.bind(this)}
            initial_click_type={this.click_type}
          >
          </Game>
        </div>;
    }
    return (
      <main>

      <Modal size="sm" 
          show={this.state.not_enough}
          onHide={() => {this.hideNem()}}
          aria-labelledby="not-enough-money"
          centered>
        <Modal.Header closeButton>
          <Modal.Title id="not-enough-money-title">
            <h3 class='w-100 modal-title text-center'> Не хватает денег! </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Выбери клик подешевле.
        </Modal.Body>
      </Modal>

      <Modal size="sm" 
          show={this.state.game_just_finished}
          onHide={() => {this.hideResultPopup()}}
          aria-labelledby="game-result"
          centered>
        <Modal.Header closeButton>
          <Modal.Title id="game-result-title" >
            <h3 class="modal-title"> {this.state.last_game_user_won ?  "Победа!" :"Поражение!"} </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Noch einmal?
        </Modal.Body>
      </Modal>


      	<br/>
      	<br/>
        <Nav id="statnavid" className="justify-content-center" justify="true">
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
