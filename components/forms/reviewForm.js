import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';
// import DropDown from '../MultiSelectDD';
// import getState from '../../api/stateData';
// import DropDownSelectedContext from '../../utils/context/dropdownSelectedContext';

const initialState = {
  spiritName: '',
  image: '',
  price: '',
  rating: '',
  description: '',
  spiritType: '',
};

function ReviewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [states, setStates] = useState([]);
  // const [existingCategories, setExistingCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   if (obj.id) setFormInput({ ...obj, state: obj.state.id });
  // }, [obj, user]);

  // useEffect(() => {
  //   getState().then(setStates);
  // }, []);

  // useEffect(() => {
  //   const previousCategories = [];
  //   if (obj.id) {
  //     if (obj.id) {
  //       obj.categories.forEach((category) => {
  //         previousCategories.push(category.id);
  //       });
  //       setExistingCategories(previousCategories);
  //     }
  //   }
  // }, [obj]);

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
        const patchPayload = { firebaseKey: name };
        updateReview(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Add a'} Review</h2>

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

      <FloatingLabel controlId="floatingInput1" label="Spirit Description" className="mb-3">
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

      <Button variant="btn-small btn-secondary" type="submit">{obj.id ? 'Update' : 'Create'} Review</Button>

    </Form>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    spiritName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    firebaseKey: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

ReviewForm.defaultProps = {
  obj: initialState,
};

export default ReviewForm;
