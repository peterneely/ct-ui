import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './list.scss';

class List extends Component {
  _list = (() => {
    const { actions: { selectItem }} = this.props;
    const handleClick = index => () => {
      selectItem(index);
    };
    return {
      render: () => {
        const { fruits, selectedItemIndex } = this.props;
        return fruits.map((fruit, index) => {
          const { name, favoriteFruit } = fruit;
          const className = `fruits-list-item ${selectedItemIndex === index ? 'mod-active' : ''}`.trim();
          return (
            <div className={className} key={index} onClick={handleClick(index)}>
              <span>{name}</span>
              <span>{favoriteFruit}</span>
            </div>
          );
        });
      },
    };
  })();

  render() {
    return (
      <div className="fruits-list-container">
        {this._list.render()}
      </div>
    );
  }
}

List.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItemIndex: PropTypes.number,
};

export default List;

