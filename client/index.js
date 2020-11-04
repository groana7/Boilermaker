// entry for client
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import User from './components/User'

ReactDOM.render(
  <Provider store={store}>
    <User />
  </Provider>,
  document.getElementById('app')
);
