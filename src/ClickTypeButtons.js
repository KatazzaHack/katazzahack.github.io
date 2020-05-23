import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class ClickTypeButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active_button: 0
    };
  }

  vari_type(v) {
    if (this.state.active_button == v) {
      return "success";
    } else {
      return "secondary";
    }
  }

	render() {
		return (<ButtonGroup size="sm">
			{this.renderButton(0, "Себя", this.vari_type(0), 100)} 
			{this.renderButton(1, "+Первых соседей", this.vari_type(1), 200)}
			{this.renderButton(2, "+Вторых соседей", this.vari_type(2), 400)}
		</ButtonGroup>);
	}

  renderButton(i, name, vari, cost) {
    return <ClickTypeButton button_name={name} variant={vari} cost={cost} onClick={() => this.handleClick(i)}/>;
  }

  handleClick(i) {
    this.setState({ active_button: i });
    console.log('button ' + i + ' was pressed');
  }
}

class ClickTypeButton extends React.Component {
	render() {
    return (
      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Это стоит {this.props.cost} рублей!</Tooltip>}>
          <Button variant={this.props.variant} onClick={() => this.props.onClick()}>
            {this.props.button_name}
          </Button>
      </OverlayTrigger>
    );
	}
}

export default ClickTypeButtons;
