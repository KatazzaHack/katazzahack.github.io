import React from 'react';
import './Game.css';

class Stats extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {
    if (!this.props.games_in_total) {
       return <div id="stats_id">Игр сыграно: 0</div>;
    }
    if (Array(2, 3, 4).includes(this.props.wins % 10)) {
      return <div id="stats_id"> 
        {this.props.wins} игры выиграны из {this.props.games_in_total}
      </div>;
    }
    return <div id="stats_id"> 
      {this.props.wins} игры выиграны из {this.props.games_in_total}
    </div>;
  }
}

export default Stats;
