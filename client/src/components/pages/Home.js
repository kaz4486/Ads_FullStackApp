import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/usersRedux';
import Ads from '../features/Ads/Ads';

const Home = () => {
  // search
  // wszystkie ads short versions (summary)

  const user = useSelector(getUser);

  return (
    <Container>
      <h1 className='m-3'>All ads</h1>
      <Ads />
    </Container>
  );
};

export default Home;
