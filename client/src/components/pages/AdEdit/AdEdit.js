import { Alert } from 'react-bootstrap';
import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { useState } from 'react';

const AdEdit = () => {
  const [user, setUser] = useState(false);

  const options = {
    method: 'GET',
    credentials: 'include',
  };

  fetch(`http://localhost:8000/auth/user`, options)
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
