import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import Fruits from '_fruits/Fruits';

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fruits />
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default App;
