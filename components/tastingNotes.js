import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';

const data = [
  { id: 1, note: 'Oak' },
  { id: 2, note: 'Caramel' },
  { id: 3, note: 'Vanilla' },
  { id: 4, note: 'Chocolate' },
  { id: 5, note: 'Pepper' },
  { id: 6, note: 'Nutty' },
  { id: 7, note: 'All Spice' },
  { id: 8, note: 'Sweet' },
  { id: 9, note: 'Butter' },
  { id: 10, note: 'Smokey' },
  { id: 11, note: 'Honey' },
  { id: 12, note: 'Citrus' },
  { id: 13, note: 'Dark Fruits' },
  { id: 14, note: 'Floral' },
  { id: 15, note: 'Peaty' },
];

const MultiSelectDropdown = ({ options, selected, toggleOption }) => (
  <div className="c-multi-select-dropdown">
    <div className="c-multi-select-dropdown__selected">
      <div> Select Tasting Notes</div>
    </div>
    <ul className="c-multi-select-dropdown__options">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <div>
            <FloatingLabel className="c-multi-select-dropdown__option" onClick={() => toggleOption({ id: option.id })}>
              <input type="checkbox" checked={isSelected} className="c-multi-select-dropdown__option-checkbox" />
              <span>{option.title}</span>
            </FloatingLabel>
          </div>
        );
      })}
    </ul>
  </div>
);

const TastingNotesDropDown = () => {
  const [selected, setSelected] = useState([]);

  const toggleOption = ({ id }) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
        // else, add
      }
      newArray.push(id);
      return newArray;
    });
  };

  return (
    <MultiSelectDropdown options={data} selected={selected} toggleOption={toggleOption} />
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  toggleOption: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TastingNotesDropDown;
