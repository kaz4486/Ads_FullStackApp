import { Alert } from 'react-bootstrap';
import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { useState } from 'react';
import { AUTH_URL } from '../../../configs/config';
import { Progress } from 'reactstrap';

const AdEdit = () => {
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
  if (!user)
    return (
      <Alert color='warning' className='mt-2'>
        'You are not authorized, First Log In'
      </Alert>
    );
  if (user === 'user') {
    return (
      <div>
        <h1>Edit Ad</h1>
        <EditAdForm />
      </div>
    );
  }
};

export default AdEdit;
