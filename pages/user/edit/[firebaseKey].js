import React from 'react';
import { useAuth } from '../../../utils/context/authContext';
import RegisterForm from '../../../components/forms/registerForm';

export default function UserEdit() {
  const { user, setUser } = useAuth();

  return (
    <RegisterForm user={user} setUser={setUser} />
  );
}
