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
			<header id="statheader">
        <h1> Корона CK убивает </h1>
				<Button
        			onClick={() => this.setState({ open: !this.state.open })}
        			aria-controls="example-collapse-text"
        			aria-expanded={this.state.open}
      			>
        			Правила
      			</Button>
      			<Collapse in={this.state.open}>
        			<div id="example-collapse-text">
          				Ты играешь за вирус. У тебя есть три вида заражений разной цены и секретные сведения о том, сколько у кого здоровья и кто с кем общается. <br/> Уничтожь всех людей и уложись в бюджет! 
        			</div>
      			</Collapse>
			</header>
		);
	}
}

export default Header;
