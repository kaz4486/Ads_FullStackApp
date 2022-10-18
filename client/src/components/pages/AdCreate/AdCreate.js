// import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { AUTH_URL } from '../../../configs/config';
import CreateAdForm from '../../features/CreateAdForm/CreateAdForm';

const AdCreate = () => {
  const [user, setUser] = useState(false);

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`${AUTH_URL}/user`, options)
    .then((res) => {
      if (res.status === 200) {
        setUser(true);
      }
    })
    .catch((err) => {
      setUser('serverError');
    });

  if (!user)
    return (
      <Alert color='warning' className='mt-2'>
        'You are not authorized, First Log In'
      </Alert>
    );
  if (user) {
    return (
      <div>
        <h1>Ad create</h1>
        <CreateAdForm />
      </div>
    );
  }
};

export default AdCreate;
