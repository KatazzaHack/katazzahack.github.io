import React from 'react';
import './Game.css';

class Stats extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      wins: 0,
      games_in_total: 0,
    };
  }

  render() {
    if (this.state.games_in_total == 0) {
       return <div id="stats_id"> Начни уже играть! </div>;
    }
    if (Array(2, 3, 4).includes(this.state.wins % 10)) {
      return <div id="stats_id"> 
        Все умерли {this.state.wins} раз из {this.state.games_in_total}.
      </div>;
    }
    return <div id="stats_id"> 
      Все умерли {this.state.wins} раз из {this.state.games_in_total}.
    </div>;
  }
}

export default Stats;
