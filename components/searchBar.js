import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setReviews, reviews }) => {
  const handleChange = (e) => {
    const filteredSpirits = [];

    reviews.forEach((review) => {
      if (review.spiritName.toLowerCase().includes(e.target.value.toLowerCase())) {
        console.warn(filteredSpirits.push(review));
      }
      // if (review.rating === e.target.value) {
      //   filteredSpirits.push(review);
      // }
    });
    setReviews(filteredSpirits);
  };

  return (
    <div>
      <input
        placeholder="Search Spirits"
        onChange={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      rating: PropTypes.number,
      spiritTypeId: PropTypes.string,
      firebaseKey: PropTypes.string,
    }),
  ).isRequired,
  setReviews: PropTypes.func.isRequired,
};

export default SearchBar;
