import React from 'react';
import ReactDOM from 'react-dom';
import './Buttons.css';

class Buttons extends React.Component {
	render() {
		return (<div>
			{this.renderButton(0)} 
			{this.renderButton(1)}
			{this.renderButton(2)}
		</div>);
	}

	renderButton(i) {
		return <Button onClick={() => this.handleClick(i)}/>;
	}

	handleClick(i) {
		console.log('button ' + i + ' was pressed');
	}
}

class Button extends React.Component {
	render() {
		return (
			<button 
				type="button" class="btn-default" 
				onClick={() => this.props.onClick()}
			>
				Button
			</button>
		);
	}
}

export default Buttons;
