import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from "reactstrap";
import { useState } from "react";
import { NavLink as ReactNavLink } from "react-router-dom";
import { BRAND } from './../config/brand';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNav = () => setIsOpen(false);

  return (
    <Navbar
      expand="md"
      className="brand-navbar"
      dark
    >
      <NavbarBrand tag={ReactNavLink} to="/" className="d-flex align-items-center gap-2">
      <img src="/logo.svg" alt={BRAND.name} width={34} height={34}/>
      <span className="fw-bold">{BRAND.name}</span>
      </NavbarBrand>
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