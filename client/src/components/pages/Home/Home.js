import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Ads from '../../features/Ads/Ads';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className='m-3 d-flex justify-content-center'>All ads</h1>
        </Col>
        <Col className='align-self-center m-3 d-flex justify-content-center'>
          <Link to={'/ads/create'}>
            <Button variant='success'> Create new ad </Button>
          </Link>
        </Col>
      </Row>
      <Ads />
    </Container>
  );
};

export default Home;
