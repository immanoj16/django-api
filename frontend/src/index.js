import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './reducers';

const wrapper = document.getElementById('app');

wrapper ?
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    wrapper
  ) : null;