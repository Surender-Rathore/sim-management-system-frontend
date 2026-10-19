import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import { useState } from "react";
import { NavLink as ReactNavLink } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNav = () => setIsOpen(false);

  return (
    <Navbar
      expand="md"
      style={{
        background: "linear-gradient(90deg, #2c3e50, #4b6584)",
      }}
      dark
    >
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mx-auto fw-bold" navbar>
          <NavItem className="mx-2">
            <ReactNavLink to="/" className="nav-link" onClick={closeNav}>
              Home
            </ReactNavLink>
          </NavItem>
          <NavItem className="mx-2">
            <ReactNavLink to="/sim-list" className="nav-link" onClick={closeNav}>
              All SIMs
            </ReactNavLink>
          </NavItem>
          <NavItem className="mx-2">
            <ReactNavLink to="/add-sim" className="nav-link" onClick={closeNav}>
              Add SIM
            </ReactNavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}