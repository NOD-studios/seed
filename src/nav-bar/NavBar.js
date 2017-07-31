import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { withAudit } from '../index'

export class NavBar extends withAudit(Component) {

  clickLogout = event => [
    event.preventDefault(),
    this.props.logoutUser()
  ]

  render() {

    return (
      <Navbar color="faded" light>

        <NavbarBrand tag={ Link } to="/">Seed</NavbarBrand>

        <Nav className="float-xs-right" navbar>

          <NavItem>
            <NavLink tag={ Link } to="/welcome">Welcome</NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={ Link } to="/register">Register</NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              target="_blank"
              href="http://github.com/NOD-studios/seed">
                GitHub
            </NavLink>
          </NavItem>

        </Nav>

      </Navbar>
    )

  }

}

export default NavBar
