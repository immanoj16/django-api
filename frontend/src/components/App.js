import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    Home component
  </div>
);

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<App />, wrapper) : null;
