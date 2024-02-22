import { useEffect, useState } from 'react';
import { getBourbonReviews } from '../api/filteredData';
import ReviewCard from '../components/reviewCard';

export default function Bourbons() {
  const [bourbons, setBourbons] = useState([]);

  const getAllBourbons = () => {
    getBourbonReviews().then(setBourbons);
  };

  useEffect(() => {
    getAllBourbons();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {bourbons.map((reviews) => (
          <ReviewCard key={reviews.firebaseKey} reviewObj={reviews} onUpdate={getAllBourbons} />
        ))}
      </div>
    </>
  );
}
