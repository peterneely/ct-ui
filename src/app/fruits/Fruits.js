import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as fruitActions from './actions';
import Chart from './chart/Chart';
import List from './list/List';
import './fruits.scss';

class Fruits extends Component {
  componentWillMount() {
    const { actions: { getPeople }} = this.props;
    getPeople();
  }

  render() {
    const { actions, people, selectedFruit } = this.props;
    return (
      <div className="fruits-container">
        <div className="fruits-content">
          <Chart actions={actions} people={people} selectedFruit={selectedFruit} />
          <List people={people} selectedFruit={selectedFruit} />
        </div>
      </div>
    );
  }
}

Fruits.propTypes = {
  actions: PropTypes.object.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFruit: PropTypes.string,
};

function mapStateToProps(state) {
  const { fruits: { people, selectedFruit }} = state;
  return { people, selectedFruit };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fruitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fruits);

