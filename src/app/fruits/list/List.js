import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

const List = ({ people, selectedFruit }) => {
  const visiblePeople = selectedFruit ? people.filter(({ favoriteFruit }) => favoriteFruit === selectedFruit) : people;
  return (
    <div className="fruits-list-container">
      {visiblePeople.map((person, index) => {
        const { name, favoriteFruit } = person;
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
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFruit: PropTypes.string,
};

export default List;

