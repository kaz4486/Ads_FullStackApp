// import { Col, Container, Row, Button } from 'react-bootstrap';
import CreateAdForm from '../features/CreateAdForm/CreateAdForm';

const AdCreate = () => {
  //tylko dla zalogowanych
  // jesli nie zalogowana to => str.główna
  return (
    <div>
      <h1>Ad create</h1>
      <CreateAdForm />
    </div>
  );
};

export default AdCreate;
