// import { Col, Container, Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import EditAdForm from '../features/EditAdForm/EditAdForm';

const AdEdit = () => {
  //tylko dla zalogowanych i autora
  // inni => strona główna albo odpowiedni komunikat
  return (
    <Form>
      <h1>Edit Ad</h1>
      <EditAdForm />
    </Form>
  );
};

export default AdEdit;
