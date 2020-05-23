import React from 'react';

class Stats extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      wins: 0
    };
  }

  render() {
    return <div id="stats_id"> 
      Ты победил {this.state.wins} раз.
    </div>;
  }
}

export default Stats;
