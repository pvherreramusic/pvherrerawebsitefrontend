import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Footer } from "./comindex";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "./libs/contextLib";
import MobileRoutes from "./MobileRoutes";
import { Auth } from "aws-amplify";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";


function PV() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    
  }
  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            
              <LinkContainer to="/buy">
                <Nav.Link>Buy Merch</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shoppingcart">
                <Nav.Link>Shopping Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/friends">
                <Nav.Link>Musical Friends</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Admin Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <MobileRoutes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default PV;