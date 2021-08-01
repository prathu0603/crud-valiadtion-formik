import React from "react";
import "./welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcomePage">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="https://fcit.usf.edu/matrix/wp-content/uploads/2017/01/DanceBot-3-LG.gif"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            CRUD Via Formik
          </Navbar.Brand>
          <Nav
            className="me-auto"
            className="d-flex justify-content-end navtext"
          >
            <Nav.Link as={NavLink} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signin">
              Signin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="textContainer d-flex">
        <div>
          <p className="welcomeP">CRUD Using Formik & Yup</p>
          <p1>Create, View, Delete, Edit Profile In Just Clicks. </p1>
          <p1>With The Power Of FORMIK </p1>
        </div>
        <div>
          <img
            alt="logo"
            className="gif"
            src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png"
          />
        </div>
      </Container>
      <Container>
        <div>
          <NavLink to="/signup">
            <button className="button">Get Started</button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
