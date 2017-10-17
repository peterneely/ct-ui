import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

const List = ({ fruits, selectedFruit }) => {
  const visibleFruits = selectedFruit ? fruits.filter(({ favoriteFruit }) => favoriteFruit === selectedFruit) : fruits;
  return (
    <div className="fruits-list-container">
      {visibleFruits.map((fruit, index) => {
        const { name, favoriteFruit } = fruit;
        return (
          <div className="fruits-list-item" key={index}>
            <span>{name}</span>
            <span>{favoriteFruit}</span>
          </div>
        );
      })}
    </div>
  );
};

List.propTypes = {
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFruit: PropTypes.string,
};

export default List;

