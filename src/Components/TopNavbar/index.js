import React, {useState} from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom"

const TopNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')

  }

  return (
    <div>
      <Navbar color="faded" light>
        
        <NavbarToggler onClick={toggleNavbar} />
        <Link to="/login" onClick={logoutHandler}>Logout</Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/Events">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/">
                Dashboard
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
