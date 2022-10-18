import { Alert } from 'react-bootstrap';
import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { useState } from 'react';
import { AUTH_URL } from '../../../configs/config';

const AdEdit = () => {
  const [user, setUser] = useState(false);

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`${AUTH_URL}/user`, options)
    .then((res) => {
      console.log(res.session);
      if (res.status === 200) {
        setUser(true);
      }
    })
    .catch((err) => {
      setUser('serverError');
    });

  console.log(user);
  if (!user)
    return (
      <Alert color='warning' className='mt-2'>
        'You are not authorized, First Log In'
      </Alert>
    );
  if (user) {
    return (
      <div>
        <h1>Edit Ad</h1>
        <EditAdForm />
      </div>
    );
  }
};

export default AdEdit;
