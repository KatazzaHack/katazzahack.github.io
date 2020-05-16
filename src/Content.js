import React from 'react';
import ReactDOM from 'react-dom';
import './Content.css';
import Buttons from './Buttons';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.is_start = true;
	}

	render() {
		return (
			<nav>
        <div>
          <div>
            <a> Stats </a>
          </div>
          <Buttons is_visible={this.is_start}></Buttons>
        </div>
      </nav>
      //<Game is_start={this.is_start} onEnd={() => this.onGameEnd()}></Game>
		);
	}

	onGameEnd() {
		console.log('game ended');
		//this.is_start = true;
	}
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Content), domContainer);

export default Content;
