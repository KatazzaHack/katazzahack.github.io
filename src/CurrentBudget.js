import React from 'react';
import './Game.css';

class CurrentBudget extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {
    return <div id="budget_id"> 
      У тебя осталось: {this.props.budget}
    </div>;
  }
}

export default CurrentBudget;
