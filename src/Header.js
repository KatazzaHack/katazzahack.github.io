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
        <h1> Корона заражает </h1>
				<Button
        			onClick={() => this.setState({ open: !this.state.open })}
        			aria-controls="example-collapse-text"
        			aria-expanded={this.state.open}
      			>
        			Правила
      			</Button>
      			<Collapse in={this.state.open}>
        			<div id="example-collapse-text">
          				Ты играешь за вирус. У тебя есть три вида кликов разной цены и мощности: <br/> 
  &bull; ты можешь заразить мирного жителя  <br/>
  &bull; затронуть ещё и его соседей  <br/>
  &bull; или даже соседей соседей  <br/>
  <br/> Из проверенных источников получена карта жителей города с текущим состоянием здоровья: зеленым, жёлтыи или красным. <br/> Уничтожь всех людей и уложись в бюджет! 
        			</div>
      			</Collapse>
			</header>
		);
	}
}

export default Header;
