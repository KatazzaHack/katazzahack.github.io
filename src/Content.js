import React from 'react';
import './Content.css';
import Game from './Game';
import Buttons from './Buttons';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.is_start = true;
	}

	render() {
		return (
			<nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" id="stats_during_game"> Stats </a>
          </div>
					<ul class="nav navbar-nav navbar-right">
          	<li>
            	<Buttons is_visible={!(this.is_start)}><Buttons/>
          	<li/>
          <ul/>
        <div/>
      <nav/>
      <Game is_start={this.is_start} onEnd={() => this.onGameEnd()}><Game/>
		);
	}

	onGameEnd() {
		log.console('game ended');
		//this.is_start = true;
	}
}

const domContainer = document.querySelector('#content');
ReactDOM.render(React.createElement(Content), domContainer);
