import React from 'react';
import './Game.css';

class Stats extends React.Component {
  constructor(props)  {
    super(props);
  }

  render() {

    if (!this.props.games_in_total) {
       return <div id="stats_id"> Пора начать играть! </div>;
    }
    if (!this.props.wins) {
      if (Array(2, 3, 4).includes(this.props.games_in_total % 10) && (!Array(12, 13, 14).includes(this.props.games_in_total))) {
        return <div id="stats_id"> Сыграно {this.props.games_in_total} игры, но человечество всегда выживало. </div>;
      } else {
        if (((this.props.games_in_total % 10) == 1) && (this.props.games_in_total != 11))
          return <div id="stats_id"> Сыграна {this.props.games_in_total} игра, в ней человечество выжило. </div>;
        return <div id="stats_id"> Сыграно {this.props.games_in_total} игр, но человечество всегда выживало. </div>;
      }

    }
    if (Array(2, 3, 4).includes(this.props.wins % 10) && !Array(12, 13, 14).includes(this.props.wins)) {
      return <div id="stats_id"> Человечество вымирало {this.props.wins} раза из {this.props.games_in_total}. </div>;
    }
    return <div id="stats_id"> Человечество вымирало {this.props.wins} раз из {this.props.games_in_total}.</div>;
  }
}

export default Stats;
