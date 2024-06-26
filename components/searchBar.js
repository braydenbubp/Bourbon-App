import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setReviewSearch, reviews }) => {
  const handleChange = (e) => {
    const filteredSpirits = [];

    reviews.forEach((review) => {
      if (review.spiritName.toLowerCase().includes(e.target.value.toLowerCase())) {
        filteredSpirits.push(review);
      }
      // if (review.rating === e.target.value) {
      //   filteredSpirits.push(review);
      // }
    });
    setReviewSearch(filteredSpirits);
  };

  return (
    <div id="searchBar">
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
      price: PropTypes.string,
      description: PropTypes.string,
      rating: PropTypes.string,
      spiritType: PropTypes.string,
      firebaseKey: PropTypes.string,
    }),
  ).isRequired,
  setReviewSearch: PropTypes.func.isRequired,
};

export default SearchBar;
