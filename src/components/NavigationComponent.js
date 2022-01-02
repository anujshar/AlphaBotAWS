import React, { Component } from 'react';
import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Card } from 'reactstrap';


class NavigationBar extends Component
{
  constructor(props)
  {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle()
  {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render()
  {
    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick = {this.toggle}/>
        <NavbarBrand href="/">AlphaBot</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" href="/contact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" href="#">About</NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-right" navbar>
          <NavItem>
            <NavLink className="nav-link" href="/authpage">Sign in</NavLink>
          </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavigationBar;
