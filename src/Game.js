import React from 'react';
import './Game.css';

class Game extends React.Component {
	constructor(props)	{
		super(props);
		console.log(this.props.is_start);
	}

  render() { 
		return (
    	<div>
				Game should be located here
    	</div>
  	);
	}
}

export default Game;
