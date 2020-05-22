import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class ClickTypeButtons extends React.Component {
	render() {
		return (<ButtonGroup size="sm">
			{this.renderButton(0, "Small")} 
			{this.renderButton(1, "Medium")}
			{this.renderButton(2, "Large")}
		</ButtonGroup>);
	}

  renderButton(i, name) {
    return <ClickTypeButton button_name={name} onClick={() => this.handleClick(i)}/>;
  }

  handleClick(i) {
    console.log('button ' + i + ' was pressed');
  }
}

class ClickTypeButton extends React.Component {
	render() {
		return (
			<Button onClick={() => this.props.onClick()}>
        {this.props.button_name}
			</Button>
		);
	}
}

export default ClickTypeButtons;
