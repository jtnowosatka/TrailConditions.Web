import React from 'react';
import './App.css';
import TrailConditionsMap from '../TrailConditionsMap/TrailConditionsMap';

function App() {
  alert("Authenticated!");
  return (
    <div className="App">
      <TrailConditionsMap />
    </div>
  );
}

export default App;
