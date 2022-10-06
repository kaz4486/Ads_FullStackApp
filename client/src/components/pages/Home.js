import { Container } from 'react-bootstrap';
import Ads from '../features/Ads/Ads';

const Home = () => {
  // search
  // wszystkie ads short versions (summary)

  return (
    <Container>
      <h1 className='m-3'>All ads</h1>
      <Ads />
    </Container>
  );
};

export default Home;
