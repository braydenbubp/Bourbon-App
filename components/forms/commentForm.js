import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import createComment from '../../api/commentData';

const initialState = {
  content: '',
};

export default function CommentForm({ commentObj }) {
  const [commentInput, setCommentInput] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...commentInput };
    console.warn(commentObj);
    createComment(payload).then(() => { router.push('/review'); });
  };
  // router.reload needs worked so page renders without reload, possible state change on view page to fix it?

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
  }).isRequired,
};
