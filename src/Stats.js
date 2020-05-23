import React from 'react';
import './Game.css';

class Stats extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {
<<<<<<< HEAD
    if (!this.props.games_in_total) {
       return <div id="stats_id">Игр сыграно: 0</div>;
=======
    if (this.state.games_in_total == 0) {
       return <div id="stats_id"> Начни уже играть! </div>;
>>>>>>> a5f7be59d721ea6c45d0907fea2025d8a9e4579d
    }
    if (Array(2, 3, 4).includes(this.props.wins % 10)) {
      return <div id="stats_id"> 
<<<<<<< HEAD
        {this.props.wins} игры выиграны из {this.props.games_in_total}
      </div>;
    }
    return <div id="stats_id"> 
      {this.props.wins} игры выиграны из {this.props.games_in_total}
=======
        Все умерли {this.state.wins} раз из {this.state.games_in_total}.
      </div>;
    }
    return <div id="stats_id"> 
      Все умерли {this.state.wins} раз из {this.state.games_in_total}.
>>>>>>> a5f7be59d721ea6c45d0907fea2025d8a9e4579d
    </div>;
  }
}

export default Stats;
