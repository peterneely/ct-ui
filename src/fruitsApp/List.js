import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './list.scss';

class List extends Component {
  _list = (() => {
    return {
      render: () => {
        const { fruits } = this.props;
        return fruits.map((fruit, index) => {
          const { name, favoriteFruit } = fruit;
          return (
            <div className="fruit-items">
              <div className="fruit-item" key={index}>
                <span>{name}</span>
                <span>{favoriteFruit}</span>
              </div>
            </div>
          );
        });
      },
    };
  })();

  render() {
    return (
      <div>
        {this._list.render()}
      </div>
    );
  }
}

List.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;

