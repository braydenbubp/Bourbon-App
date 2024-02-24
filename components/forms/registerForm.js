// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';

// function RegisterForm({ user, setUser }) {
//   const [formData, setFormData] = useState({
//     bio: '',
//     userName: '',
//     uid: user.uid,
//   });

//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (user.firebaseKey) {
//       updataUser({ ...formData, firebaseKey: user.firebaseKey }).then(setUser)
//         .then(router.push('/userReviews'));
//     }
//     registerUser(formData).then(router.push('/userReviews'));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3">
//         <Form.Label><h1>Spirit Enthusiast</h1></Form.Label>
//         <Form.Control as="textarea" name="userName" id="userName" required placeholder="Enter your User Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//         <Form.Control as="textarea" name="bio" id="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
//       </Form.Group>
//       <Button variant="secondary" type="submit" className="btn btn-small">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// RegisterForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//     bio: PropTypes.number.isRequired,
//     firebaseKey: PropTypes.string,
//   }).isRequired,
//   setUser: PropTypes.func.isRequired,
// };

// export default RegisterForm;
