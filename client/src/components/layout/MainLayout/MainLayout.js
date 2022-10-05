import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
