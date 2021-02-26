import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Form,
  FormGroup,
  Button,
} from 'reactstrap';
import { LOGOUT_REQUEST } from '../redux/types';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({ type: LOGOUT_REQUEST });
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    console.log('addPostClick');
  };

  const AuthLink = (
    <Fragment>
      <NavItem>
        {userRole === 'admin' ? (
          <Form className="col mt-2">
            <Link
              to="posts"
              className="btn btn-success block px-3 text-white"
              onClick={addPostClick}
            ></Link>
          </Form>
        ) : (
          ''
        )}
      </NavItem>

      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>

      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const GuestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar dark color="dark" expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog
          </Link>

          <NavbarToggler onClick={handleToggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around">
              {isAuthenticated ? AuthLink : GuestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavBar;
