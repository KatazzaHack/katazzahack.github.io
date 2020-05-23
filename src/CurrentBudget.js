import React from 'react';
import './Game.css';

class CurrentBudget extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      budget: 100
    };
  }

  render() {
    return <div id="budget_id"> 
      У тебя осталось: {this.state.budget}
    </div>;
  }
}

export default CurrentBudget;
