import { useState } from 'react';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createAddRequest,
  getRequest,
  getStatus,
} from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';

const CreateAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useSelector(getRequest);
  const status = useSelector(getStatus);

  const handleSubmit = (ad) => {
    dispatch(createAddRequest(ad));
    // setTimeout(() => {
    //   return navigate('/');
    // }, 500);
  };

  if (request.pending) {
    return <Spinner animation='border' />;
  }

  return (
    <div>
      {status === 201 && (
        <Alert variant='success'>Your ad was successfully created</Alert>
      )}
      <AdForm action={handleSubmit} actionText='Create Ad' />
    </div>
  );
};

export default CreateAdForm;
