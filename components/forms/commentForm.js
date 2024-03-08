import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  content: '',
};

export default function CommentForm({ reviewDetails, onUpdate }) {
  const [commentInput, setCommentInput] = useState(initialState);

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...commentInput, uid: user.uid };
    createComment(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name, reviewId: reviewDetails.firebaseKey };
      updateComment(patchPayload).then(() => onUpdate());
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput4" label="Spirit Comment" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Comment Here"
          name="content"
          value={commentInput.content}
          onChange={handleChange}
          required
        />
        <Button variant="btn-small btn-secondary" type="submit"> Comment </Button>
      </FloatingLabel>
    </Form>
  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    reviewId: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  reviewDetails: PropTypes.shape({
    image: PropTypes.string,
    spiritName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    reviewId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}.isRequired;
