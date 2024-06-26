import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';

const initialState = {
  userId: '',
  spiritName: '',
  image: '',
  price: '',
  rating: '',
  description: '',
  spiritType: '',
};

function ReviewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateReview(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReview(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, userId: user.firebaseKey };
        updateReview(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add a'} Review</h2>

      <FloatingLabel controlId="floatingInput1" label="Spirit Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Spirit"
          name="spiritName"
          value={formInput.spiritName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Select value={formInput.spiritType} onChange={handleChange} name="spiritType" label="Spirit Type" className="mb-3">
        <option>Spirit Type</option>
        <option value="Bourbon">Bourbon</option>
        <option value="Scotch">Scotch</option>
        <option value="Whiskey">Whiskey</option>
      </Form.Select>

      <FloatingLabel controlId="floatingInput1" label="Spirit Review" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Spirit Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Your Rating" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Rating"
          name="rating"
          value={formInput.rating}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Spirit Images" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="btn-small btn-secondary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Review</Button>

    </Form>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    spiritName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    spiritType: PropTypes.string,
  }),
};

ReviewForm.defaultProps = {
  obj: initialState,
};

export default ReviewForm;
