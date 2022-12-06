import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Haeder.scss";

export default function Header() {
  const alert = useAlert();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get user from local storage and parse it then set it to user
    if (token) {
      const userLocal = localStorage.getItem("user");
      const user = JSON.parse(userLocal);
      // console.log(user.user);
      setUser(user?.user);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert.success("You are successfully logged out");
  };

  return (
    <div className="header">
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="bg-color"
      >
        <Container>
          <Navbar.Brand href="/">Libaray</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Books</Nav.Link>
              <NavDropdown title="Jonra" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Self-development
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Comic</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Mysrious</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#action/3.4">thelar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {token ? (
                <div className="flex">
                  <p className="user">{user?.name}</p>
                  <img className="userpic" src={user?.photo} alt="" srcset="" />
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </div>
              ) : (
                <Nav.Link as={Link} to="/signin">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
