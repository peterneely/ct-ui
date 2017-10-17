import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as fruitActions from './actions';
import Chart from './Chart';
import List from './List';
import './fruits.scss'

class Fruits extends Component {
  componentWillMount() {
    const { actions: { getFruits }} = this.props;
    getFruits();
  }

  render() {
    const { actions, fruits } = this.props;
    return (
      <div className="fruits-container">
        <div className="fruits-content">
          <Chart actions={actions} fruits={fruits} />
          <List actions={actions} fruits={fruits} />
        </div>
      </div>
    );
  }
}

Fruits.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { fruitsApp: { fruits }} = state;
  return { fruits };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fruitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fruits);

