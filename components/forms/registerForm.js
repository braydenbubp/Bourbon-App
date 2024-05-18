import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { registerUser, updateUserBio } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

function RegisterForm({ userObj }) {
  const [formData, setFormData] = useState({
    bio: '',
    userName: '',
  });
  const { user, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userObj.firebaseKey) {
      setFormData(userObj);
    }
  }, [userObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.firebaseKey) {
      updateUserBio(formData).then(() => {
        updateUser(user.uid).then(() => router.push('/userReviews'));
      });
    } else {
      const payload = { ...formData, uid: userObj.uid };
      registerUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUserBio(patchPayload).then(() => {
          router.push('/userReviews');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{userObj.firebaseKey ? 'Update' : 'Add a'} Bio</h2>

      <FloatingLabel controlId="floatingInput1" label="User Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="User Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="User Bio" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="btn-small btn-secondary" type="submit">{userObj.firebaseKey ? 'Edit' : 'Create'} Bio</Button>

    </Form>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    uid: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default RegisterForm;
