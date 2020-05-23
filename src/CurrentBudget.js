import React from 'react';
import './Game.css';

class CurrentBudget extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {
    if (!this.props.budget) {
      return <div id="budget_id"> 
      </div>;
    }
    return <div id="budget_id"> 
      У тебя осталось: {this.props.budget} рублей.
    </div>;
  }
}

export default CurrentBudget;
