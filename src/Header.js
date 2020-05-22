import React from 'react';
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
				<div
        			onClick={() => this.setState({ open: !this.state.open })}
        			aria-controls="example-collapse-text"
        			aria-expanded={this.state.open}
      			>
        			Rules
      			</div>
      			<Collapse in={this.state.open}>
        			<div id="example-collapse-text">
          				Rules will be here.
        			</div>
      			</Collapse>
			</header>
		);
	}
}

export default Header;
