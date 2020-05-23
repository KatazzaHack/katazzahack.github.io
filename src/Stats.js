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
    if (!this.props.wins % 10) {
      if (Array(2, 3, 4).includes(this.props.games_in_total % 10)) {
        return <div id="stats_id"> Сыграно {this.props.games_in_total} игры, но человечество всегда выживало. </div>;
      } else {
        if (this.props.games_in_total == 1) return <div id="stats_id"> Сыграна одна игра, но человечество выживало. </div>;
        return <div id="stats_id"> Сыграно {this.props.games_in_total} игр, но человечество всегда выживало. </div>;
      }

    }
    if (Array(2, 3, 4).includes(this.props.wins % 10)) {
      return <div id="stats_id"> Человечество вымирало {this.props.wins} раза из {this.props.games_in_total}. </div>;
    }
    return <div id="stats_id"> Человечество вымирало {this.props.wins} раз из {this.props.games_in_total}.</div>;
  }
}

export default Stats;
