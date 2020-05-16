import React from 'react';
import './Game.css';

class Game extends React.Component {
	constructor(props)	{
		super(props);
		this.game_is_active = !this.props.is_start;
		console.log('game active: ' + this.game_is_active);
	}

  render() {
		if (this.game_is_active) {
			return (
    		<div>
					Game should be located here
    		</div>
  		);
		} else {
			return (
				<div>
					<button onClick={this.startGame()}>
						Start game
					</button>
				</div>
			);
		}
	}

	startGame() {
		this.game_is_active = true;
	}
}

export default Game;
