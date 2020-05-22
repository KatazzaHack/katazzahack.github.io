import React from 'react';
import Button from 'react-bootstrap/Button';

class Buttons extends React.Component {
	render() {
		return (<div>
			{this.renderButton(0)} 
			{this.renderButton(1)}
			{this.renderButton(2)}
		</div>);
	}

	renderButton(i) {
		return <ClickTypeButton onClick={() => this.handleClick(i)}/>;
	}

	handleClick(i) {
		console.log('button ' + i + ' was pressed');
	}
}

class ClickTypeButton extends React.Component {
	render() {
		return (
			<button 
				type="button" class="btn-default" 
				onClick={() => this.props.onClick()}
			>
				Button with click type
			</button>
		);
	}
}

export default Buttons;
