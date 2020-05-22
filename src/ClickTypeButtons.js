import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class ClickTypeButtons extends React.Component {
	render() {
		return (<ButtonGroup>
			{this.renderButton(0)} 
			{this.renderButton(1)}
			{this.renderButton(2)}
		</ButtonGroup>);
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
			<Button onClick={() => this.props.onClick()}>
				Button with click type
			</Button>
		);
	}
}

export default ClickTypeButtons;
