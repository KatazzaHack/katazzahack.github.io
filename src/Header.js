import React from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

class Header extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		open: false
    	};
    }


	render() {
		return (
			<header>
				<Button
        			onClick={() => this.setState({ open: !this.state.open })}
        			aria-controls="example-collapse-text"
        			aria-expanded={this.state.open}
      			>
        			Правила
      			</Button>
      			<Collapse in={this.state.open}>
        			<div id="example-collapse-text">
          				Жмякай, чтобы заражать. Есть разные виды заражений. Уничтож всех людей и уложись в бюджет.
        			</div>
      			</Collapse>
			</header>
		);
	}
}

export default Header;
