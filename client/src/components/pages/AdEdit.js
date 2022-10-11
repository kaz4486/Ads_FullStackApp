// import { Col, Container, Row, Button } from 'react-bootstrap';
// import { Form } from 'react-bootstrap';
import EditAdForm from '../features/EditAdForm/EditAdForm';
// import { loadUserRequest } from './redux/usersRedux';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

const AdEdit = () => {
  // const dispatch = useDispatch();

  // let user = null

  // useEffect(() => {
  //  fetch(`http://localhost:8000/auth/user`)
  //  .then((response) => {
  //   return response.json();
  //  })
  //  .then((data) => {
  //   user = data
  //  })
  // }, [dispatch]);

  // if (!user){
  //   return
  // }

  return (
    <div>
      <h1>Edit Ad</h1>
      <EditAdForm />
    </div>
  );
};

export default AdEdit;
