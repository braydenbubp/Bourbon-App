import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      id="login"
      className="text-center text-white d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome Spirit Guru</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Enter
      </Button>
    </div>
  );
}

export default Signin;
