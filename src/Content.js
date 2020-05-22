import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Game from './Game';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.is_start = true;
	}

	render() {
		return (

			<div>
				<nav>
        	<div>
          	<div>
            	<p> Stats </p>
          	</div>
          	<Button is_visible={this.is_start}> Начни блять игру</Button>
        	</div>
      	</nav>
      	<Game is_start={this.is_start} onEnd={() => this.OnGameEnd()}></Game>
			</div>
		);
	}

	onGameEnd() {
		this.is_start = true;
	}
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Content), domContainer);

export default Content;
