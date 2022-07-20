import * as React from "react";

// Navbar
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Icons
import { TbBrandTwitter, TbBrandGithub } from "react-icons/tb";

// Importing styling
import "../Styles/App.css";

class NavbarMain extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>Weather App</Navbar.Brand>
          <Nav>
            <Nav.Link href="https://github.com/JKane22">
              <TbBrandGithub
                style={{ 
                  height: "20px", 
                  width: "20px" 
                }}
              />
            </Nav.Link>
            <Nav.Link eventKey={2} href="https://twitter.com/VIISSEEE">
              <TbBrandTwitter style={{ height: "20px", width: "20px" }} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarMain;
