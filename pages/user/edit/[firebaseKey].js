import React from 'react';
import RegisterForm from '../../../components/forms/registerForm';
import { useAuth } from '../../../utils/context/authContext';

export default function UserEdit() {
  const { user } = useAuth();

  return (
    <RegisterForm userObj={user} />
  );
}
