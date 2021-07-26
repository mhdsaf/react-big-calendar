import React from 'react';
import './App.css'
import Calendar from './containers/Calendar/Calendar';
import Task from './containers/Task/Task';

const App = () => {
  return (
    <div className="App">
      {/* <Calendar/> */}
      <Task/>
    </div>
  );
}

export default App