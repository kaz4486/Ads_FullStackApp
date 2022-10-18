import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { getUser } from '../../../redux/usersRedux';
import styles from '../Header/Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => getUser(state));

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className={styles.navbar} navbar>
            <Col>
              <NavItem>
                <Link to='/' className={styles.home}>
                  Home
                </Link>
              </NavItem>
            </Col>
            <Col className='d-flex justify-content-end '>
              {user !== null && (
                <NavItem>
                  <Link to='/logout'>
                    <Button outline color='danger' className={styles.buttons}>
                      Sing out
                    </Button>
                  </Link>
                </NavItem>
              )}

              {user == null && (
                <Row className='align-items-center'>
                  <Col>
                    <NavItem>
                      <Link to='/register'>
                        <Button
                          outline
                          color='primary'
                          className={styles.buttons}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </NavItem>
                  </Col>
                  <Col>
                    <NavItem>
                      <Link to='/login'>
                        <Button
                          outline
                          color='primary'
                          className={styles.buttons}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </NavItem>
                  </Col>
                </Row>
              )}
            </Col>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
