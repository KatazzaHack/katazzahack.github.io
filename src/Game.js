import React from 'react';
import './Game.css';
import Button from 'react-bootstrap/Button';

class Game extends React.Component {
	constructor(props)	{
		super(props);
		this.game_is_active = !this.props.is_start;
		console.log('game active: ' + this.game_is_active);
	}

  render() {
		// if (this.game_is_active) {
		// return (
    //		<div id="game-container">
		//		Game should be located here
   	// 		</div>
  	//	);
		// } else {
			return (
				<div>
					<Button onClick={() => this.startGame()}>
						Start game
					</Button>
				</div>
			);
		//}
	}

	startGame() {
		console.log('start game');
		this.game_is_active = true;
		this.container = document.getElementById('game-container');
		this.container.dispatchEvent(new Event('gameStart'));
	}
}

export default Game;
