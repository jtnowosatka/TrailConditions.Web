import React from 'react';
import './UnauthenticatedApp.css';
import TrailConditionsMap from '../TrailConditionsMap/TrailConditionsMap';

function App() {
  return (
    <div className="App">
      <a href="localhost:3000">Click here to authenticate!</a>
      <TrailConditionsMap />
    </div>
  );
}

export default App;
