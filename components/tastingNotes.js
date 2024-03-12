import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/router';
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
          <FloatingLabel className="c-multi-select-dropdown__option" onClick={() => toggleOption({ firebaseKey: option.firebaseKey })}>
            <input
              type="checkbox"
              checked={selected[option.firebaseKey]}
              className="c-multi-select-dropdown__option-checkbox"
            />
            <span>{option.note}</span>
          </FloatingLabel>
        </div>
      ))}
    </ul>
  </div>
);

const TastingNotesDropDown = ({ existingNotes }) => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState([]);
  const { setSelectedNotes } = useContext(DropDownSelectedContext);

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    setSelectedNotes(selected);
  });

  useEffect(() => {
    if (existingNotes.length > 0) {
      setSelected(existingNotes);
    }
  }, [existingNotes]);

  const toggleOption = () => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(firebaseKey)) {
        return newArray.filter((item) => item !== firebaseKey);
        // else, add
      }
      newArray.push(firebaseKey);
      return newArray;
    });
  };

  useEffect(() => {
    getTastingNotes().then(setNotes);
  }, []);

  return (
    <MultiSelectDropdown options={notes} selected={selected} toggleOption={toggleOption} firebaseKey={firebaseKey} />
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

TastingNotesDropDown.propTypes = {
  existingNotes: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default TastingNotesDropDown;
