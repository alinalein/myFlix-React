import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { MoviesFilter } from '../movies-filter/movies-filter'
import { removeUser } from '../../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'

import './navigation-bar.scss'

export const NavigationBar = () => {

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();

  const location = useLocation();
  const isMainView = location.pathname === '/';

  return (
    <Navbar sticky="top" data-bs-theme="dark" expand="md" style={{ padding: '0px' }}>
      <Container fluid style={{ background: 'black' }} className="nav__container">
        <Navbar.Brand as={Link} to="/">
          <span className="logo">myFlix</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                {/* links have to match the paths in main-view */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/crime">
                    Crime
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/biography">
                    Biography
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sci-fi">
                    Sci-Fi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/action">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/drama">
                    Drama
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/favorite-movies">
                  My List
                </Nav.Link>
                <Nav>
                  {isMainView && <MoviesFilter />}
                </Nav>
              </>
            )}
          </Nav>
          {user && (
            <Nav className="ml-auto">
              <NavDropdown title="My Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user-profile">
                  User Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/edit-profile">
                  Edit Profile
                </NavDropdown.Item>
                <hr className="dropdown-divider" />
                <NavDropdown.Item as={Link} to="/delete-profile">
                  Delete Profile
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => {
                dispatch(removeUser());
              }}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
