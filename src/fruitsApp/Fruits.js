import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as fruitActions from './actions';
import Chart from './Chart';
import List from './List';
import './fruits.scss';

class Fruits extends Component {
  componentWillMount() {
    const { actions: { getFruits }} = this.props;
    getFruits();
  }

  render() {
    const { actions, fruits, selectedFruit } = this.props;
    return (
      <div className="fruits-container">
        <div className="fruits-content">
          <Chart actions={actions} fruits={fruits} selectedFruit={selectedFruit} />
          <List fruits={fruits} selectedFruit={selectedFruit} />
        </div>
      </div>
    );
  }
}

Fruits.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFruit: PropTypes.string,
};

function mapStateToProps(state) {
  const { fruitsApp: { fruits, selectedFruit }} = state;
  return { fruits, selectedFruit };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fruitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fruits);

