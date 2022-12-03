import axios from "axios";
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
    // get item from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // get user data from token
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;

      axios
        .get("/api/users/me")
        .then((res) => {
          console.log(res.data);
          // compare user id from token with user id from local storage
          if (res.data.id === userId) {
            setUser(res.data);
          }
        })
        .catch((error) => {
          alert.error("Error fetching user");
        });
    }
  }, []);

  return (
    <div className="header">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        // className="bg-color"
      >
        <Container>
          <Navbar.Brand href="/">Libaray</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Menu</Nav.Link>
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
              <p>{user?.name}</p>
              {token ? (
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
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
