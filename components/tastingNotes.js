import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import DropDownSelectedContext from '../utils/context/dropDownContext';
import getTastingNotes from '../api/tastingNoteData';

const MultiSelectDropdown = ({
  options, selected, toggleOption,
}) => (
  <div className="c-multi-select-dropdown">
    <div className="c-multi-select-dropdown__selected">
      <div> Select Tasting Notes </div>
    </div>
    <ul className="c-multi-select-dropdown__options">
      {options.map((option) => (
        <div>
          <FloatingLabel className="c-multi-select-dropdown__option" onClick={(e) => toggleOption(e.target.id, option)}>
            <input
              type="checkbox"
              checked={selected[option.firebaseKey]}
              className="c-multi-select-dropdown__option-checkbox"
              id={option.firebaseKey}
            />
            <span>{option.note}</span>
          </FloatingLabel>
        </div>
      ))}
    </ul>
  </div>
);

const TastingNotesDropDown = ({ existingNotes, selected, setSelected }) => {
  const [notes, setNotes] = useState([]);
  const { setSelectedNotes } = useContext(DropDownSelectedContext);

  useEffect(() => {
    setSelectedNotes(selected);
  });

  useEffect(() => {
    if (existingNotes.length > 0) {
      setSelected(existingNotes);
    }
  }, [existingNotes, setSelected]);

  const toggleOption = (toggleId, option) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      const isOptionInArray = newArray.some((item) => item.firebaseKey === toggleId);
      if (isOptionInArray) {
        return newArray.filter((item) => item.firebaseKey !== toggleId);
        // else, add
      }
      newArray.push(option);
      return newArray;
    });
  };

  useEffect(() => {
    getTastingNotes().then((notesArray) => setNotes(notesArray));
  }, []);
  // useEffect(() => {
  //   getTastingNotes().then((notesArray) => setSelected(notesArray));
  // }, [setSelected]);
  return (
    <MultiSelectDropdown options={notes} selected={selected} toggleOption={toggleOption} />
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      note: PropTypes.string.isRequired,
      firebaseKey: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    }),
  ).isRequired,
  toggleOption: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

TastingNotesDropDown.propTypes = {
  existingNotes: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSelected: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TastingNotesDropDown;
