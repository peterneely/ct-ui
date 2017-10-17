import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as fruitActions from './actions';

class Fruits extends Component {
  componentWillMount() {
    const { actions: { getFruits }} = this.props;
    getFruits();
  }

  renderFruits = () => {
    const { fruits } = this.props;
    return fruits.map(({ name, favoriteFruit: fruit }, index) => (
      <div key={index}>
        <span>{name}</span>
        <span>{fruit}</span>
      </div>
    ));
  };

  render() {
    return (
      <div>
        {this.renderFruits()}
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

