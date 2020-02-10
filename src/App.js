import React, { Component } from 'react';
import OpenRight from './container/OpenRight';
import GridCard from './container/GridCard';
class App extends Component {
  render(){
    return (
    <div>

      <OpenRight />
      <GridCard />
    </div>
    );
  }
}

export default App;
