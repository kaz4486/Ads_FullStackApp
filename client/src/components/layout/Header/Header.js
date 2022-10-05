import { useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto align-items-center' navbar>
            <NavItem>
              <NavLink href='/'>Home</NavLink>
            </NavItem>
            {/* gdy jest zalogowana*/}
            <NavItem>
              <NavLink href='/logout'>
                <Button outline color='danger'>
                  Sing out
                </Button>
              </NavLink>
            </NavItem>
            {/*gdy nie jest zalogowana */}
            <NavItem>
              <NavLink href='/register'>
                <Button outline color='primary'>
                  Sign Up
                </Button>
              </NavLink>
            </NavItem>
            {/*gdy nie jest zalogowana */}
            <NavItem>
              <NavLink href='/login'>
                <Button outline color='primary'>
                  Sign In
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
