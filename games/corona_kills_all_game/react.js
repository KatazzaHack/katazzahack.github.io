'use strict';

//import React from 'react';
//import ReactDOM from 'react-dom';

class Test extends React.Component {
  render() {
		return (
			<div>
				Here is the test text
			</div>
		);
  }
}

const domContainer = document.querySelector('#graph_event_handler');
ReactDOM.render(<Test/>, domContainer);
