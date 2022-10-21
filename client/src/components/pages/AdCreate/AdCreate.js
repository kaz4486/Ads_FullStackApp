// import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Progress } from 'reactstrap';
import { AUTH_URL } from '../../../configs/config';
import CreateAdForm from '../../features/CreateAdForm/CreateAdForm';

const AdCreate = () => {
  const [user, setUser] = useState('loading'); //loading, user, noUser, serverError

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`${AUTH_URL}/user`, options)
    .then((res) => {
      if (res.status === 200) {
        setUser('user');
      } else {
        setUser('noUser');
      }
    })
    .catch((err) => {
      setUser('serverError');
    });

  if (user === 'noUser')
    return (
      <Alert color='warning' className='mt-2'>
        You are not authorized, First Log In
      </Alert>
    );
  if (user === 'serverError')
    return (
      <Alert color='danger' className='mt-2'>
        Something went wrong...
      </Alert>
    );
  if (user === 'loading')
    return <Progress animated color='primary' value={50} />;
  if (user === 'user') {
    return (
      <div>
        <h1>Ad create</h1>
        <CreateAdForm />
      </div>
    );
  }
};

export default AdCreate;
