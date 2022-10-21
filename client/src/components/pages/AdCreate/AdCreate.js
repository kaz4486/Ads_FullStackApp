// import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from 'reactstrap';
import { AUTH_URL } from '../../../configs/config';
import { getUser } from '../../../redux/usersRedux';
import CreateAdForm from '../../features/CreateAdForm/CreateAdForm';

const AdCreate = () => {
  const user = useSelector((state) => getUser(state));

  if (!user)
    return (
      <Alert color='warning' className='mt-2'>
        You are not authorized, First Log In
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
